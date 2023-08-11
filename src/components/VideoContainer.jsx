import { useEffect, useState } from "react";
import { YOUTUBE_API } from "/utils/constants.js";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

function VideoContainer() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  async function getVideos() {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    setVideos(json.items);
  }

  const vids = videos.map((video) => (
    <Link key={video.id} to={"/watch?v=" + video.id}>
      <VideoCard info={video} />
    </Link>
  ));

  return (
    <div className="p-3 grid grid-cols-container gap-6">
      {videos.length <= 0 ? <Shimmers /> : vids}
    </div>
  );
}

export default VideoContainer;

function Shimmers(){
  return (
    <>
    {Array(25).fill(null).map(() => <Shimmer />)}
    </>

  )
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
