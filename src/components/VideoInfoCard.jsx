import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import formatCount from "../../utils/formatCount";

export default function VideoInfoCard({ info }) {

  const publishedAt = new Date(info[0].publishedAt);
  const timeAgo = formatDistanceToNow(publishedAt, {
    addSuffix: true,
  });

  console.log();
  let [views, char] = formatCount(info[1]?.viewCount);
  let [isInfoVisible, setVisible] = useState(false);

  return (
    <div className="p-2 py-4">
      <p className="font-medium text-lg sm:text-xl mb-1 sm:mb-2">
        {info[0].title}
      </p>
      <section className="relative">
        <p className="text-xs sm:text-sm text-[#999] mb-2 flex gap-1 whitespace-nowrap items-center">
          <span>
            {views}
            {char} views
          </span>
          <span>•</span>
          <span>{timeAgo}</span>
          {info[0]?.tags && <span className=" ml-2 overflow-hidden text-ellipsis max-w-[190px] sm:max-w-[400px]">
            #{info[0]?.tags?.slice(0, 4).join(" #")}
          </span>}
        </p>
        {isInfoVisible && (
          <pre className="text-sm font-Roboto whitespace-pre-line mb-2 mt-4">
            {info[0]?.description}
          </pre>
        )}
        <button
          onClick={() => setVisible(!isInfoVisible)}
          className="absolute right-0 bottom-0 text-sm text-white bg-gradient-to-l from-[#111] via-[#111] pl-10 pr-2 text-xs sm:text-sm"
        >
          ...{isInfoVisible ? "less" : "more"}
        </button>
      </section>

      <p className="text-sm">{info[0]?.channelTitle}</p>
    </div>
  );
}
