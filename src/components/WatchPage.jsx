import { useSearchParams } from "react-router-dom";
//if you use useparams it takes only after the / but we are using query strings over here so use useSearchParams

function WatchPage() {

  const [params] = useSearchParams();

  //this returns us a urlSearchParamts object which has a map of keys and its values of query strings, we can now get a value of a key.
  console.log(params.get("v"));
  

  return (
    <div>
      <iframe
        className="w-full aspect-video max-w-screen-xl"
        src={
          "https://www.youtube.com/embed/" + params.get("v") + "?autoplay=true"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default WatchPage