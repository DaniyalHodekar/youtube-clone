import { useSearchParams } from "react-router-dom";
//if you use useparams it takes only after the / but we are using query strings over here so use useSearchParams
import { VIDEO_INFO_API1,VIDEO_INFO_API2 } from "../../utils/constants";
import { useEffect,useState } from "react";

function WatchPage() {

  const [info,setInfo] = useState([]);
  const [params] = useSearchParams();
  const id = params.get("v"); 
  useEffect(()=>{
    getVideoInfo(id);
  },[]);

  async function getVideoInfo(videoId){
    const data = await fetch(VIDEO_INFO_API1 + videoId + VIDEO_INFO_API2);
    const json = await data.json();
    const {snippet,statistics} = json.items[0];
    setInfo([snippet,statistics]);
  }
  //this returns us a urlSearchParamts object which has a map of keys and its values of query strings, we can now get a value of a key.
 
  return (
    <div className="grid xl:grid-cols-[3fr_1fr] xl:ml-9 ">
      <div className="mt-4">
        <iframe
          className="w-full aspect-video max-w-screen-xl"
          src={"https://www.youtube.com/embed/" + id + "?autoplay=true"}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        {info.length == 0 ? <VideoCardShimmer /> : <VideoInfoCard info={info} />}
      </div>
      <div>Related</div>
    </div>
  );
}

export default WatchPage;

function VideoInfoCard({info}){
  
  return (
    <div className="py-4">
      <p className="font-medium text-xl">{info[0].title}</p>
      <p>{info[0].channelTitle}</p>
    </div>
  );
}

function VideoCardShimmer(){
  return <p>Shimmering</p>
}

