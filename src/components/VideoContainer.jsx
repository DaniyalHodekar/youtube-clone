import { useCallback, useEffect, useRef, useState } from "react";
import { YOUTUBE_API } from "/utils/constants.js";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import delay from "../../utils/delay";

function VideoContainer() {
  const [videos, setVideos] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);

  const getVideos = useCallback(async function () {
    try {
      const data = await fetch(YOUTUBE_API);
      const json = await data.json();
      setVideos(json.items);
      setNextPage(json.nextPageToken);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getMoreVideos = useCallback(
    async function () {
      setLoading(true);
      await delay(1000);
      const data = await fetch(YOUTUBE_API + `&pageToken=${nextPage}`);
      const json = await data.json();
      setVideos((prevVideos) => {
        return [...prevVideos, ...json.items];
      });
      setLoading(false);
      setNextPage(json.nextPageToken);
    },
    [nextPage]
  );

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    let node = buttonRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // console.log("Infinite scrolling");
        getMoreVideos();
      }
    });

    observer.observe(node);

    return function () {
      observer.unobserve(node);
    };
  }, [getMoreVideos, nextPage]);

  const vids = videos?.map((video) => (
    <Link key={video.id} to={"/watch?v=" + video.id}>
      <VideoCard info={video} />
    </Link>
  ));

  return (
    <>
      <div className="pt-16 p-1 grid grid-cols-container gap-5">
        {videos?.length <= 0 ? <Shimmers /> : vids}
      </div>
      {loading ? (
        <div className="p-1 grid grid-cols-container gap-6">
          <Shimmers />
        </div>
      ) : (
        <button
          ref={buttonRef}
          className="py-2 w-full max-w-xl px-4 rounded-full text-sm text-sky-400 my-6 border border-[#333] hover:bg-sky-950 transition-colors relative left-1/2 -translate-x-1/2"
        >
          Loading more videos...
        </button>
      )}
    </>
  );
}

export default VideoContainer;

export function Shimmers() {
  return (
    <>
      {Array(30)
        .fill(null)
        .map((_, i) => (
          <Shimmer key={i} />
        ))}
    </>
  );
}

function Shimmer() {
  return (
    <div className="mb-6">
      <p className="bg-[#222] aspect-video rounded-lg animate-pulse"></p>
      <div className="flex">
        <div className="bg-[#222] animate-pulse w-10 h-10 rounded-full mt-4 mr-3 aspect-square"></div>
        <div className="h-full w-full">
          <p className="bg-[#222] h-4 max-w-[250px] rounded-md my-3 animate-pulse"></p>
          <p className="bg-[#222] h-3 max-w-[130px] rounded-md my-3 animate-pulse"></p>
          <p className="bg-[#222] h-3 max-w-[100px] rounded-md animate-pulse"></p>
        </div>
      </div>
    </div>
  );
}
