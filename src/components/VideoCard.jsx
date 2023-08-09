function VideoCard({ info }) {
  
  const { snippet, statistics } = info;
  let { channelTitle, title } = snippet;
  const thumbnail = snippet.thumbnails.medium.url;
  let views = (statistics.viewCount / 1e3).toFixed();
  let char = "K";
  if (views > 1000) {
    views /= 1000;
    views = views.toFixed(1);
    char = "M";
  }
  if (title.length > 100) {
    title = title.slice(0, 100).concat(`...`);
  }
  return (
    <div className="relative">
      <img src={thumbnail} alt="thumbnail" className="rounded-lg w-full" />
      <h2 className="mt-3 mb-1 font-medium ">{title}</h2>
      <p className="text-[#aaa] text-sm">{channelTitle} &#x2713;</p>

      <span className="text-[#aaa] text-sm relative bottom-[3px]">
        {views}
        {char} views
      </span>
    </div>
  );
}


export default VideoCard;
