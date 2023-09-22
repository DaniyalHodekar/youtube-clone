import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import formatCount from "../../utils/formatCount";
import { useDispatch, useSelector } from "react-redux";
import {
  addVideo,
  addSubscription,
  removeVideo,
  removeSub,
} from "../../utils/loginSlice";
import { CHANNEL_DETAILS_API } from "../../utils/constants";

export default function VideoInfoCard({ info, videoId }) {
  const [details, setDetails] = useState(null);
  const [isInfoVisible, setVisible] = useState(false);
  const publishedAt = new Date(info[0].publishedAt);
  const timeAgo = formatDistanceToNow(publishedAt, {
    addSuffix: true,
  });

  useEffect(() => {
    getChannelInfo(info[0].channelId);
  }, [info]);

  async function getChannelInfo(channelId) {
    let res = await fetch(CHANNEL_DETAILS_API + channelId);
    let json = await res.json();
    let thumbnailUrl = json?.items[0].snippet.thumbnails.default.url;
    let subs = json?.items[0].statistics.subscriberCount;
    setDetails([subs, thumbnailUrl]);
  }
  const likedVideos = useSelector((store) => store.login.likedVideos);
  const subscriptions = useSelector((store) => store.login.subscriptions);
  const subscribed = subscriptions.includes(info[0].channelTitle);
  const liked = likedVideos.includes(videoId);
  const dispatch = useDispatch();

  return (
    <div className="p-2 py-3 md:px-0">
      <h2 className="font-semibold font-Noto text-[1.1rem] sm:text-lg mb-5 md:mb-3 tracking-tight leading-snug">
        {info[0].title}
      </h2>
      <div className="flex items-center flex-wrap">
        <div className="items-center flex mb-4 mr-3 grow">
          {details && (
            <img
              src={details[1]}
              alt="channel avatar"
              className="w-10 rounded-full"
            />
          )}

          <div className="text-sm mx-3 flex items-center gap-2">
            <div>
              <h2 className="flex items-center font-medium lg:text-base">
                {info[0]?.channelTitle}
                <svg
                  height="24"
                  viewBox="0 0 24 26"
                  focusable="false"
                  className="w-4 ml-2"
                  fill="#aaa"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
                </svg>
              </h2>
              {details && (
                <p className="text-xs text-[#aaa]">
                  {formatCount(details[0])} subscribers
                </p>
              )}
            </div>
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
                if (subscriptions.includes(info[0].channelTitle)) {
                  dispatch(removeSub(info[0].channelTitle));
                } else {
                  dispatch(addSubscription(info[0].channelTitle));
                }
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
        <div className="mb-4 mr-3 flex">
          <button
            className={
              "flex items-center gap-2 rounded-l-full p-1.5 px-4 text-sm font-medium " +
              (!liked
                ? "bg-[#252525] hover:bg-[#333]"
                : " bg-sky-950 active:bg-sky-900 text-sky-500")
            }
            onClick={() => {
              if (likedVideos.includes(videoId)) {
                dispatch(removeVideo(videoId));
              } else {
                dispatch(addVideo(videoId));
              }
            }}
          >
            <svg height="24" width="24" viewBox="0 0 24 26" fill="currentColor">
              <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
            </svg>
            {formatCount(info[1]?.likeCount)}
          </button>
          <button
            className="flex items-center gap-2 rounded-r-full p-1.5 px-4 text-sm font-medium bg-[#252525] hover:bg-[#333] border-l border-[#444]"
            onClick={() => {
              dispatch(removeVideo(videoId));
            }}
          >
            <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
            </svg>
          </button>
        </div>
        <DummyButtons />
      </div>
      <section
        className={
          "relative bg-[#252525] rounded-xl p-3 pb-2 transition-colors" +
          (isInfoVisible ? "" : " lg:hover:bg-[#333] cursor-pointer")
        }
        onClick={() => setVisible(true)}
      >
        <p className="text-sm font-medium mb-1 flex gap-1 whitespace-nowrap items-center">
          <span>{formatCount(info[1]?.viewCount)}&nbsp;views&nbsp;</span>

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

function DummyButtons() {
  return (
    <>
      <div className="mb-4 mr-3">
        <button className="flex items-center gap-2 rounded-full p-1.5 px-4 text-sm font-medium bg-[#252525] hover:bg-[#333]">
          <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63 M14,3v6 C6.22,10.13,3.11,15.33,2,21c2.78-3.97,6.44-6,12-6v6l8-9L14,3L14,3z"></path>
          </svg>
          Share
        </button>
      </div>
      <div className="mb-4">
        <button className="flex items-center gap-2 rounded-full p-1.5 px-4 text-sm font-medium bg-[#252525] hover:bg-[#333]">
          <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z"></path>{" "}
          </svg>
          Save
        </button>
      </div>
    </>
  );
}
