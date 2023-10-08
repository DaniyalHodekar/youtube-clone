import { useDispatch, useSelector } from "react-redux";
import {
  removeSub,
  addSubscription,
  addSubUrl,
} from "../../../utils/loginSlice";
import { memo } from "react";
import formatCount from "../../../utils/formatCount";

const ChannelHeader = memo(function ChannelHeader({ data }) {
  const dispatch = useDispatch();
  const subscriptions = useSelector((store) => store.login.subscriptions);
  const subscribed = subscriptions.includes(
    data?.items[0].snippet.localized.title
  );

  return (
    <header className="flex flex-col md:flex-row gap-3 md:gap-6 md:px-2 ">
      <img
        src={data.items[0].snippet.thumbnails.default.url}
        alt="channel avatar"
        className="rounded-full w-16 self-start my-auto md:w-32 mx-auto"
      />
      <div className="grow text-center mx-auto md:text-start">
        <h2 className="text-lg md:text-2xl mb-1">
          {data.items[0].snippet.localized.title}
          <svg
            height="20"
            viewBox="0 0 24 28"
            focusable="false"
            className="ml-2 md:ml-3 w-3 md:w-4 inline"
            fill="#aaa"
          >
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
          </svg>
        </h2>
        <div className="flex gap-2 text-xs md:text-sm text-[#aaa] justify-center md:justify-normal">
          <span className="font-medium">
            {data?.items[0].snippet.customUrl}
          </span>
          <span>
            {formatCount(data?.items[0].statistics.subscriberCount)}
            &nbsp;subscribers
          </span>

          <span>
            {formatCount(data?.items[0].statistics.videoCount)}
            &nbsp;videos
          </span>
        </div>
        <div className="flex items-center text-xs md:text-sm mt-2">
          <p className="text-[#aaa]  md:whitespace-nowrap">
            {data.items[0].snippet.description.slice(0, 75) + "..."}
          </p>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1">
            <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path>
          </svg>
        </div>
      </div>
      <div>
        <button
          className={
            "flex items-center gap-2 rounded-full p-1.5 px-4 pl-3 text-sm font-medium mt-2 mx-auto " +
            (!subscribed
              ? "bg-[#252525] hover:bg-[#333] "
              : "bg-zinc-200 hover:bg-zinc-300 text-zinc-800")
          }
          onClick={() => {
            if (
              subscriptions.includes(data?.items[0].snippet.localized.title)
            ) {
              dispatch(removeSub(data?.items[0].snippet.localized.title));
            } else {
              dispatch(addSubscription(data?.items[0].snippet.localized.title));
              dispatch(
                addSubUrl([
                  data?.items[0].snippet.localized.title,
                  data.items[0].snippet.thumbnails.default.url,
                ])
              );
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
    </header>
  );
});

export default ChannelHeader;
