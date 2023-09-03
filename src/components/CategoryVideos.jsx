import { useEffect, useState } from "react";
import { CATEGORY_API } from "/utils/constants.js";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { Shimmers } from "./VideoContainer";
import { useSearchParams } from "react-router-dom";

function CategoryVideos() {
  const [videos, setVideos] = useState([]);
  const [params] = useSearchParams();

  useEffect(() => {
    getVideos(params.get("id"));
  }, [params]);

  async function getVideos(id) {
    const data = await fetch(
      CATEGORY_API + id + "&key=AIzaSyC5htb0LtlNokBQEdAIQ95nell3pm0LcQk"
    );
    const json = await data.json();
    setVideos(json.items);
  }

  const vids = videos.map((video) => (
    <Link key={video.id} to={"/watch?v=" + video.id}>
      <VideoCard info={video} />
    </Link>
  ));

  return (
    <>
      <h1 className="ml-2 text-3xl lg:text-4xl font-bold my-4 lg:my-6">
        {params.get("page")}
      </h1>
      <div className="p-1 grid grid-cols-container gap-4 mb-10">
        {videos.length <= 0 ? <Shimmers /> : vids}
      </div>
    </>
  );
}

export default CategoryVideos;
