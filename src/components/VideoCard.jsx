import { useEffect, useState, memo } from "react";
import formatCount from "../../utils/formatCount";
import { formatDistanceToNow } from "date-fns";
import { CHANNEL_API } from "../../utils/constants";
import formatTime from "../../utils/formatTime";
import { Link } from "react-router-dom";

const VideoCard = memo(function VideoCard({ info }) {
  const [imgUrl, setImgUrl] = useState(null);
  const { snippet, statistics } = info;
  let { channelTitle, title, publishedAt } = snippet;
  const thumbnail = snippet.thumbnails.medium.url;
  let [views, char] = formatCount(statistics.viewCount);
  const time = new Date(publishedAt);
  const timeAgo = formatDistanceToNow(time, {
    addSuffix: true,
  });

  let durationStr = info?.contentDetails?.duration;
  let duration = formatTime(durationStr);

  useEffect(() => {
    // getChannelInfo(snippet?.channelId);
  }, []);

  async function getChannelInfo(channelId) {
    let res = await fetch(CHANNEL_API + channelId);
    let json = await res.json();
    setImgUrl(json?.items[0]?.snippet?.thumbnails?.default?.url);
  }

  return (
    <div className="overflow-hidden mb-3 md:mb-5">
      <div className="relative">
        <Link to={"/watch?v=" + info.id}>
          <img
            src={thumbnail}
            alt="thumbnail"
            className="sm:rounded-lg w-full bg-[#222] aspect-video"
            loading="lazy"
          />
        </Link>
        <span className="absolute bottom-1 right-1 rounded bg-black px-1 py-0.5 text-xs font-medium">
          {duration}
        </span>
      </div>
      <div className="flex">
        {imgUrl ? (
          <Link to={"/channel/" + snippet?.channelId} className="min-w-fit">
            <img
              src={imgUrl}
              alt="channel avatar"
              className="w-10 h-10 rounded-full  mt-4 mr-3"
            />
          </Link>
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#222] mt-4 mr-3 aspect-square"></div>
        )}
        <div>
          <Link to={"/watch?v=" + info.id}>
            <h2
              title={title}
              className="text-sm md:text-base mt-4 md:mt-3 mb-1 md:font-medium md:leading-snug"
            >
              {title}
            </h2>
          </Link>
          <Link to={"/channel/" + snippet?.channelId}>
            <p className="text-[#aaa] text-xs md:text-sm flex items-center lg:hover:text-white">
              {channelTitle}{" "}
              <svg
                height="20"
                viewBox="0 0 24 28"
                focusable="false"
                className="ml-1 md:ml-2 w-3 md:w-4"
                fill="#aaa"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
              </svg>
            </p>
          </Link>
          <div className="text-[#aaa] text-xs md:text-sm flex gap-1">
            <span>
              {views}
              {char} views
            </span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default VideoCard;
