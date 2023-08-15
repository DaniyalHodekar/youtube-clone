import { useSearchParams, Link } from "react-router-dom";
//if you use useparams it takes only after the / but we are using query strings over here so use useSearchParams
import {
  VIDEO_INFO_API1,
  VIDEO_INFO_API2,
  RELATED_VIDEOS_API,
  RELATED_VIDEOS_API_2,
} from "../../utils/constants";
import { useEffect, useState, useRef } from "react";
import VideoCard from "./VideoCard";
import { Shimmers } from "./VideoContainer";
import Comments from "./Comments";
import VideoInfoCard from "./VideoInfoCard";

function WatchPage() {
  const [info, setInfo] = useState([]);
  const [params] = useSearchParams();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const targetRef = useRef(null);
  const id = params.get("v");
  useEffect(() => {
    getVideoInfo(id);
    targetRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [id]);

  async function getVideoInfo(videoId) {
    const data = await fetch(VIDEO_INFO_API1 + videoId + VIDEO_INFO_API2);
    const json = await data.json();
    const { snippet, statistics } = json.items[0];
    getRelatedVideos(snippet.categoryId);
    setInfo([snippet, statistics]);
  }
  //this returns us a urlSearchParams object which has a map of keys and its values of query strings, we can now get a value of a key.

  async function getRelatedVideos(categoryId) {
    let data = await fetch(
      RELATED_VIDEOS_API + categoryId + RELATED_VIDEOS_API_2
    );
    let json = await data.json();
    setRelatedVideos(json.items);
  }

  const vids = relatedVideos?.map((video) => (
    <VideoCard key={video.id} info={video} />
  ));

  return (
    <div className="grid lg:grid-cols-[3fr_1fr] lg:ml-9 gap-6">
      <div className="mt-3 md:p-2">
        <iframe
          ref={targetRef}
          className="w-full aspect-video max-w-screen-xl"
          src={"https://www.youtube.com/embed/" + id + "?autoplay=true"}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        {info.length == 0 ? (
          <VideoCardShimmer />
        ) : (
          <VideoInfoCard info={info} />
        )}
        {<Comments videoId={id}/>}
      </div>
      <div className="flex flex-col p-2 gap-4">
        <p className="ml-2">Up Next</p>
        {relatedVideos?.length == 0 ? <Shimmers /> : vids}
      </div>
    </div>
  );
}

export default WatchPage;

export function VideoCardShimmer() {
  return (
    <>
      <p className="h-5 rounded-lg max-w-xl bg-[#222]"></p>
      <p className="h-4 rounded-lg max-w-sm bg-[#222] my-3"></p>
    </>
  );
}
