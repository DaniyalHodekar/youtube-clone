import { useRef } from "react";
import Button from "./Button";

const buttons = [
  "Front-end",
  "Gaming",
  "Kapil Sharma",
  "Cricket",
  "F1",
  "Merge Sort",
  "Sliding Window",
  "Binary Search",
  "Songs",
  "Soccer",
  "JavaScript",
  "Dynamic Programming",
  "Bollywood",
  "Cyber security",
  "Chess",
  "One Piece",
  "Node.js",
  "iphones",
  "unboxing",
  "Computers",
  "Live",
];

export default function ButtonList() {
  const scrollRef = useRef(null);
  const leftRef = useRef(null);

  function handleScroll() {
    scrollRef.current.scrollLeft += 200;
    if (scrollRef.current.scrollLeft + 200 > 0) {
      leftRef.current.classList.remove("opacity-0");
    }
  }

  function handleScrollLeft() {
    scrollRef.current.scrollLeft -= 200;

    if (scrollRef.current.scrollLeft - 200 <= 0) {
      leftRef.current.classList.add("opacity-0");
    }
  }

  return (
    <div className="fixed z-10 left-0 right-2">
      <div
        ref={scrollRef}
        className="flex gap-3 py-3 px-3 overflow-x-auto no-scrollbar  bg-[#0f0f0f] scroll-smooth"
      >
        {buttons.map((ok, i) => (
          <Button key={i} name={ok} />
        ))}
        <button
          onClick={handleScroll}
          className="absolute right-0 bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f] to-transparent p-1 text-xs pl-10"
        >
          <svg
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            fill="currentColor"
          >
            <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path>
          </svg>
        </button>
        <button
          ref={leftRef}
          onClick={handleScrollLeft}
          className="absolute left-0 p-1 pr-10 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f] to-transparent text-xs opacity-0"
        >
          <svg
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            fill="currentColor"
            className="rotate-180"
          >
            <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
