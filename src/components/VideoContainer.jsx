import { useEffect, useState } from "react";
import { YOUTUBE_API } from "/utils/constants.js";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

function VideoContainer() {
  const [videos, setVideos] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getVideos();
  }, []);

  async function getVideos() {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    // console.log(json);
    setVideos(json.items);
    setNextPage(json.nextPageToken);
  }

  async function getMoreVideos() {
    setLoading(true);
    const data = await fetch(YOUTUBE_API + `&pageToken=${nextPage}`);
    const json = await data.json();
    // console.log(json);
    setVideos((prevVideos) => {
      return [...prevVideos, ...json.items];
    });
    setLoading(false);
    setNextPage(json.nextPageToken);
  }

  const vids = videos.map((video) => (
    <Link key={video.id} to={"/watch?v=" + video.id}>
      <VideoCard info={video} />
    </Link>
  ));

  return (
    <>
      <div className="p-1 grid grid-cols-container gap-4">
        {videos.length <= 0 ? <Shimmers /> : vids}
      </div>
      {loading ? (
        <div className="p-1 grid grid-cols-container gap-6">
          <Shimmers />
        </div>
      ) : (
        <button
          onClick={getMoreVideos}
          className="py-2 w-full max-w-xl px-4 rounded-full text-sm text-sky-400 my-6 border border-[#333] hover:bg-sky-950 transition-colors relative left-1/2 -translate-x-1/2"
        >
          Show more
        </button>
      )}
    </>
  );
}

export default VideoContainer;

export function Shimmers() {
  return (
    <>
      {Array(15)
        .fill(null)
        .map((_,i) => (
          <Shimmer key={i} />
        ))}
    </>
  );
}

function Shimmer() {
  return (
    <div>
      <p className="bg-[#222] aspect-video rounded-lg animate-pulse"></p>
      <p className="bg-[#222] h-4 max-w-[250px] rounded-md my-3 animate-pulse"></p>
      <p className="bg-[#222] h-3 max-w-[130px] rounded-md my-3 animate-pulse"></p>
      <p className="bg-[#222] h-3 max-w-[100px] rounded-md animate-pulse"></p>
    </div>
  );
}
