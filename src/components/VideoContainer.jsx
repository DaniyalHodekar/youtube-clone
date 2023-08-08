import { useEffect, useState } from "react";
import {YOUTUBE_API} from "/utils/constants.js"
import VideoCard from "./VideoCard";

function VideoContainer() {
  const [videos,setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  },[]);

  async function getVideos() {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    setVideos(json.items);
  }

  const vids = videos.map(video => <VideoCard info={video}/>)

  return (
    <div className="p-3 grid grid-cols-container gap-5 ">
      {videos.length == 0 ? <h2>Loading</h2> : vids}
    </div>
  );
}

export default VideoContainer