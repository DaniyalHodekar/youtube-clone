import { useEffect, useState } from "react";
import { COMMENTS_API, RELATED_VIDEOS_API_2 } from "../../utils/constants";
import { formatDistanceToNow } from "date-fns";
import { VideoCardShimmer } from "./WatchPage";
function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [nextPage, setNextPage] = useState("");

  async function getComments(Id) {
    const url = COMMENTS_API + `&videoId=${Id}` + RELATED_VIDEOS_API_2;

    const res = await fetch(url);
    if (!res.ok) {
      setDisabled(true);
      return;
    }
    const json = await res.json();
    // console.log(json?.items);
    setComments(json?.items);
    setNextPage(json?.nextPageToken);
  }

  async function getMoreComments(Id) {
    if (!nextPage) return;
    const url =
      COMMENTS_API +
      `&videoId=${Id}&pageToken=${nextPage}` +
      RELATED_VIDEOS_API_2;
    const res = await fetch(url);
    const json = await res.json();
    setComments([...comments, ...(json?.items ?? [])]);
    console.log(comments);
    if (json?.nextPageToken) {
      setNextPage(json?.nextPageToken);
    } else {
      setNextPage("");
    }
  }

  useEffect(() => {
    getComments(videoId);
  }, []);

  const thread =
    comments.length > 0 &&
    comments?.map((comment) => {
      let {
        authorDisplayName,
        authorProfileImageUrl,
        publishedAt,
        likeCount,
        textOriginal,
      } = comment.snippet.topLevelComment.snippet;

      const time = new Date(publishedAt);
      const timeAgo = formatDistanceToNow(time, {
        addSuffix: true,
      });

      return (
        <div key={comment.id} className="flex gap-4">
          <div className="shrink-0">
            <img
              className="rounded-full w-10"
              src={authorProfileImageUrl}
              alt={authorDisplayName}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>
              <span className="font-medium">{authorDisplayName} &nbsp;</span>
              <span className="text-[#aaa]"> {timeAgo}</span>
            </p>
            <pre className="font-Roboto whitespace-normal">{textOriginal}</pre>
            <p>
              {likeCount >= 1000
                ? Math.floor(likeCount / 100) + "K"
                : likeCount}{" "}
              likes
            </p>
          </div>
        </div>
      );
    });

  return (
    <div>
      {!disabled && (
        <p className="mr-6 ml-2 my-2 font-medium text-lg">Comments:</p>
      )}
      {!disabled && comments?.length > 0 ? (
        <div className="flex flex-col gap-8 rounded-lg p-3 text-sm">
          {thread}
          <div>
            <button
              className="ml-1 rounded-full p-2 pl-2 pr-4 active:bg-sky-950 lg:hover:bg-sky-950 text-sky-500 flex items-center gap-1"
              onClick={() => {
                getMoreComments(videoId);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                className="pointer-events-none w-6"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z"></path>
              </svg>

              <span>Load More</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {disabled ? (
            <p className="px-2">
              Comments for this video have been disabled by the uploader
            </p>
          ) : (
            <div className="flex flex-col gap-4 p-4">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <VideoCardShimmer key={i} />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Comments;
