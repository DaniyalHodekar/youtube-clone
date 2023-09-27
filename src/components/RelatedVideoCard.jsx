import formatCount from "../../utils/formatCount";
import { formatDistanceToNow } from "date-fns";
import formatTime from "../../utils/formatTime";

function RelatedVideoCard({ info }) {
  const { snippet, statistics } = info;
  let { channelTitle, title, publishedAt } = snippet;
  const thumbnail = snippet.thumbnails.medium.url;
  const time = new Date(publishedAt);
  const timeAgo = formatDistanceToNow(time, {
    addSuffix: true,
  });
  let durationStr = info?.contentDetails?.duration;
  let duration = formatTime(durationStr);
  return (
    <div className="relative flex gap-3 text-sm">
      <div className="relative shrink-0 self-start">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="rounded w-40 bg-[#222] aspect-video "
          loading="lazy"
        />
        <span className="absolute bottom-1 right-1 rounded bg-black px-1 py-0.5 text-xs font-medium">
          {duration}
        </span>
      </div>
      <div className="overflow-hidden whitespace-nowrap">
        <h2
          title={title}
          className="mb-1 mt-0.5 font-medium xl:whitespace-normal overflow-hidden text-ellipsis"
        >
          {title}
        </h2>
        <p className="text-[#aaa] text-xs overflow-hidden text-ellipsis">
          {channelTitle}
        </p>
        <p className="text-[#aaa] text-xs mt-[2px] overflow-hidden text-ellipsis">
          {formatCount(statistics.viewCount)}&nbsp;views&nbsp;•&nbsp;{timeAgo}
        </p>
      </div>
    </div>
  );
}

export default RelatedVideoCard;
