import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import formatCount from "../../utils/formatCount";
import { useDispatch, useSelector } from "react-redux";
import { addVideo, addSubscription } from "../../utils/loginSlice";

export default function VideoInfoCard({ info, videoId }) {
  console.log(info);
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
  let [likes, likesChar] = formatCount(info[1]?.likeCount);
  let [isInfoVisible, setVisible] = useState(false);

  return (
    <div className="p-2 py-3">
      <h2 className="font-semibold font-Noto sm:text-lg mb-3 tracking-tight leading-snug">
        {info[0].title}
      </h2>
      <div className="flex items-center flex-wrap">
        <div className="items-center flex mb-4 mr-3 grow">
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
          <div className="ml-auto">
            <button
              className={
                "flex items-center gap-2 rounded-full p-1.5 px-4 pl-3 text-sm font-medium " +
                (!subscribed
                  ? "bg-[#252525] hover:bg-[#333] "
                  : "bg-zinc-200 hover:bg-zinc-300 text-zinc-800")
              }
              onClick={() => {
                dispatch(addSubscription(info[0].channelTitle));
              }}
            >
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                focusable="false"
                fill="currentColor"
              >
                <path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z"></path>
              </svg>
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <button
            className={
              "flex items-center gap-2 rounded-full p-1.5 px-4 text-sm font-medium " +
              (!liked
                ? "bg-[#252525] hover:bg-[#333]"
                : " bg-sky-950 active:bg-sky-900 text-sky-500")
            }
            onClick={() => {
              dispatch(addVideo(videoId));
            }}
          >
            <svg height="24" width="24" viewBox="0 0 24 26" fill="currentColor">
              <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
            </svg>
            {likes}
            {likesChar}
          </button>
        </div>
      </div>
      <section
        className={
          "relative bg-[#252525] rounded-xl p-3 pb-2 transition-colors" +
          (isInfoVisible ? "" : " lg:hover:bg-[#333] cursor-pointer")
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
          <pre className="text-xs sm:text-sm font-Roboto whitespace-pre-line mb-1">
            {info[0]?.description.slice(0, 80) + "..."}
          </pre>
        )}
        {isInfoVisible && (
          <pre className="text-xs sm:text-sm font-Roboto whitespace-pre-line mb-1">
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
