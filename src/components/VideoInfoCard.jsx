import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import formatCount from "../../utils/formatCount";
import { useDispatch, useSelector } from "react-redux";
import { addVideo, addSubscription } from "../../utils/loginSlice";

export default function VideoInfoCard({ info, videoId }) {
  const publishedAt = new Date(info[0].publishedAt);
  const timeAgo = formatDistanceToNow(publishedAt, {
    addSuffix: true,
  });

  const likedVideos = useSelector((store) => store.login.likedVideos);
  const subscriptions = useSelector((store) => store.login.subscriptions);
  const subscribed = subscriptions.includes(info[0].channelTitle);
  const liked = likedVideos.includes(videoId);
  const dispatch = useDispatch();

  let [views, char] = formatCount(info[1]?.viewCount);
  let [isInfoVisible, setVisible] = useState(false);

  return (
    <div className="p-2 py-3">
      <h2 className="font-semibold font-Noto text-lg mb-3 tracking-tight leading-snug">
        {info[0].title}
      </h2>
      <div className="flex items-center flex-wrap">
        <div className="items-center flex mb-4 mr-3">
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            alt="channel avatar"
            className="w-10 rounded-full"
          />
          <div className="text-sm mx-3 flex items-center gap-2">
            <span>{info[0]?.channelTitle}</span>

            <svg
              height="24"
              viewBox="0 0 24 24"
              focusable="false"
              className="w-4"
              fill="#aaa"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
            </svg>
          </div>
          <div className="flex items-center">
            <button
              className={
                !subscribed
                  ? "bg-[#252525] hover:bg-[#333] rounded-full p-1 px-3.5 text-sm"
                  : "rounded-full p-1 px-3.5 text-sm bg-zinc-200 hover:bg-zinc-300 text-zinc-800"
              }
              onClick={() => {
                dispatch(addSubscription(info[0].channelTitle));
              }}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <button
            className={
              !liked
                ? "bg-[#252525] hover:bg-[#333] rounded-full p-1 px-3.5 text-sm"
                : "rounded-full p-1 px-3.5 text-sm bg-sky-950 hover:bg-sky-900 text-sky-500"
            }
            onClick={() => {
              dispatch(addVideo(videoId));
            }}
          >
            {liked ? "Liked" : "Like"}
          </button>
        </div>
      </div>
      {/* <div className=" flex items-center justify-between mb-4"></div> */}

      <section
        className={
          "relative bg-[#252525] rounded-xl p-3 transition-colors" +
          (isInfoVisible ? "" : " hover:bg-[#333] cursor-pointer")
        }
        onClick={() => setVisible(true)}
      >
        <p className="text-sm font-medium mb-2 flex gap-1 whitespace-nowrap items-center">
          <span>
            {views}
            {char} views&nbsp;
          </span>

          <span>{timeAgo}</span>
          {info[0]?.tags && (
            <span className=" ml-2 overflow-hidden text-ellipsis text-[#AAA] max-w-[100px] sm:max-w-[350px]">
              #{info[0]?.tags?.slice(0, 5).join(" #")}
            </span>
          )}
        </p>
        {!isInfoVisible && (
          <pre className="text-sm font-Roboto whitespace-pre-line mb-1">
            {info[0]?.description.slice(0, 80) + "..."}
          </pre>
        )}
        {isInfoVisible && (
          <pre className="text-sm font-Roboto whitespace-pre-line mb-1">
            {info[0]?.description}
          </pre>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setVisible(!isInfoVisible);
          }}
          className="text-sm text-white"
        >
          ...{isInfoVisible ? "less" : "more"}
        </button>
      </section>
    </div>
  );
}
