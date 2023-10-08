import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

function SearchVideoCard({ info }) {
  const { snippet } = info;
  let { channelTitle, title, publishedAt } = snippet;
  const thumbnail = snippet.thumbnails?.medium?.url;
  const time = new Date(publishedAt);
  const timeAgo = formatDistanceToNow(time, {
    addSuffix: true,
  });

  return (
    <div className="relative mb-5">
      <img
        src={thumbnail}
        alt="thumbnail"
        className="rounded-lg w-full bg-[#222] aspect-video"
        loading="lazy"
      />
      <h2 className="mt-3 mb-2 md:font-medium leading-snug">{title}</h2>
      <p className="text-[#aaa] text-sm leading-snug">
        <Link
          to={"/channel/" + info.snippet.channelId}
          className="md:hover:text-white"
        >
          {channelTitle}
        </Link>
        <svg
          height="20"
          viewBox="0 0 24 28"
          focusable="false"
          className="ml-2 w-3 md:w-4 inline"
          fill="#aaa"
        >
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
        </svg>
      </p>

      <div className="text-[#aaa] text-sm">
        <span>{timeAgo}</span>
      </div>
    </div>
  );
}

export default SearchVideoCard;
