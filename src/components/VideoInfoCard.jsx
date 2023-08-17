import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import formatCount from "../../utils/formatCount";

export default function VideoInfoCard({ info }) {
  const publishedAt = new Date(info[0].publishedAt);
  const timeAgo = formatDistanceToNow(publishedAt, {
    addSuffix: true,
  });

  let [views, char] = formatCount(info[1]?.viewCount);
  let [isInfoVisible, setVisible] = useState(false);

  return (
    <div className="p-2 py-3">
      <p className="font-semibold font-Noto text-lg mb-2 tracking-tight">
        {info[0].title}
      </p>
      <p className="text-sm">{info[0]?.channelTitle}</p>
      <section className="relative bg-[#252525] rounded-xl p-3 mt-3">
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
          <pre className="text-sm font-Roboto whitespace-pre-line mb-1">
            {info[0]?.description.slice(0, 80) + "..."}
          </pre>
        )}
        {isInfoVisible && (
          <pre className="text-sm font-Roboto whitespace-pre-line mb-1">
            {info[0]?.description}
          </pre>
        )}
        <button
          onClick={() => setVisible(!isInfoVisible)}
          className="text-sm text-white"
        >
          ...{isInfoVisible ? "less" : "more"}
        </button>
      </section>
    </div>
  );
}
