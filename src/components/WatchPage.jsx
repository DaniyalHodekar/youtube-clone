import { useSearchParams, Link, useOutletContext } from "react-router-dom";
//if you use useparams it takes only after the / but we are using query strings over here so use useSearchParams
import {
  VIDEO_INFO_API1,
  VIDEO_INFO_API2,
  RELATED_VIDEOS_API,
  RELATED_VIDEOS_API_2,
} from "../../utils/constants";
import { useEffect, useState } from "react";
import RelatedVideoCard from "./RelatedVideoCard";
import { Shimmers } from "./VideoContainer";
import Comments from "./Comments";
import VideoInfoCard from "./VideoInfoCard";

function WatchPage() {
  const [info, setInfo] = useState([]);
  const [params] = useSearchParams();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [error, setError] = useState(false);
  const id = params.get("v");
  const targetRef = useOutletContext();
  useEffect(() => {
    getVideoInfo(id);
    targetRef.current.scrollTop = 0;
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
    let res = await fetch(
      RELATED_VIDEOS_API + categoryId + RELATED_VIDEOS_API_2
    );
    if (!res.ok) {
      setError(true);
      return;
    }
    let json = await res.json();

    setRelatedVideos(json.items);
  }

  const vids = relatedVideos?.map((video) => (
    <Link key={video.id} to={"/watch?v=" + video.id}>
      <RelatedVideoCard info={video} />
    </Link>
  ));

  return (
    <div className="grid lg:grid-cols-[3fr_1.2fr] gap-4 xl:px-8">
      <div className="mt-2 md:p-2">
        <iframe
          src={"https://www.youtube.com/embed/" + id + "?autoplay=true"}
          className="w-full aspect-video max-w-screen-xl"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        {info.length == 0 ? (
          <VideoCardShimmer />
        ) : (
          <VideoInfoCard info={info} videoId={id} />
        )}
        {<Comments key={id} videoId={id} />}
      </div>
      <div className="flex flex-col p-1 gap-6 sm:gap-3 max-w-full overflow-hidden mb-8">
        <p className="ml-1 text-sm">Up Next</p>

        {!error ? (
          <>{relatedVideos?.length == 0 ? <Shimmers /> : vids}</>
        ) : (
          <p>Error getting videos :{"("}</p>
        )}
      </div>
    </div>
  );
}

export default WatchPage;

export function VideoCardShimmer() {
  return (
    <div className="mt-4 px-2">
      <p className="h-4 rounded-lg max-w-xl bg-[#222]"></p>
      <p className="h-4 rounded-lg max-w-sm bg-[#222] my-3"></p>
    </div>
  );
}
