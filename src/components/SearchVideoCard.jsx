import { formatDistanceToNow } from "date-fns";
function SearchVideoCard({ info }) {
  // console.log(info);
  const { snippet } = info;
  let { channelTitle, title, publishedAt } = snippet;
  const thumbnail = snippet.thumbnails?.medium?.url;
  const time = new Date(publishedAt);
  const timeAgo = formatDistanceToNow(time, {
    addSuffix: true,
  });
  return (
    <div className="relative">
      <img
        src={thumbnail}
        alt="thumbnail"
        className="rounded-lg w-full bg-[#222] aspect-video"
        loading="lazy"
      />
      <h2 className="mt-3 mb-1 font-medium ">{title}</h2>
      <p className="text-[#aaa] text-sm">{channelTitle} &#x2713;</p>

      <div className="text-[#aaa] text-sm mt-[2px]">
        <span>{timeAgo}</span>
      </div>
    </div>
  );
}

export default SearchVideoCard;
