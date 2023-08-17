import { useEffect, useState } from "react";
import { COMMENTS_API, RELATED_VIDEOS_API_2 } from "../../utils/constants";
import { formatDistanceToNow } from "date-fns";
import { VideoCardShimmer } from "./WatchPage";
function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    getComments(videoId);
  }, []);

  async function getComments(Id) {
    const url = COMMENTS_API + `&videoId=${Id}` + RELATED_VIDEOS_API_2;

    const res = await fetch(url);
    if (!res.ok) {
      setDisabled(true);
      return;
    }
    const json = await res.json();
    setComments(json?.items);
  }

  const thread = comments?.map((comment) => {
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
            {likeCount >= 1000 ? Math.floor(likeCount / 100) + "K" : likeCount}{" "}
            likes
          </p>
        </div>
      </div>
    );
  });

  return (
    <div>
      {!disabled && <span className="mr-6 ml-2">Comments</span>}
      {!disabled && <button>Sort By:</button>}
      {!disabled && comments?.length > 0 ? (
        <div className="flex flex-col gap-8 rounded-lg p-3 text-sm">
          {thread}
        </div>
      ) : (
        <>
          {disabled ? (
            <p className="px-2">
              Comments for this video have been disabled by the uploader
            </p>
          ) : (
            <div className="flex flex-col gap-4 p-4">
              {Array(15)
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
