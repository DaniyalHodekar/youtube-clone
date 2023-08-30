import formatCount from "../../utils/formatCount";
import { formatDistanceToNow } from "date-fns";
function RelatedVideoCard({ info }) {
  // console.log(info);
  const { snippet, statistics } = info;
  let { channelTitle, title, publishedAt } = snippet;
  const thumbnail = snippet.thumbnails.medium.url;
  let [views, char] = formatCount(statistics.viewCount);
  const time = new Date(publishedAt);
  const timeAgo = formatDistanceToNow(time, {
    addSuffix: true,
  });
  return (
    <div className="relative sm:flex gap-3 text-sm">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="rounded sm:w-44 w-full bg-[#222] aspect-video"
            loading="lazy"
          />
      <div>
        <h2 className="mb-1 mt-3 sm:mt-0 font-medium lg:whitespace-nowrap lg:max-w-xs overflow-hidden text-ellipsis">
          {title}
        </h2>
        <p className="text-[#aaa] text-xs">{channelTitle}</p>
        <div className="text-[#aaa] text-xs mt-[2px] flex gap-1">
          <span>
            {views}
            {char} views
          </span>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

export default RelatedVideoCard;
