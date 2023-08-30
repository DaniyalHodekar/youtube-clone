import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API, RELATED_VIDEOS_API_2 } from "/utils/constants.js";
import { Link } from "react-router-dom";
import { Shimmers } from "./VideoContainer";
import SearchVideoCard from "./SearchVideoCard";

function SearchContainer({ params }) {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(false);
  // console.log(params);
  useEffect(() => {
    getVideos();
  }, [params]);

  async function getVideos() {
    const data = await fetch(
      YOUTUBE_SEARCH_API + params + RELATED_VIDEOS_API_2
    );
    if (!data.ok) {
      setError(true);
      return;
    }
    const json = await data.json();
    setVideos(json.items);
  }

  const vids = videos.map((video) => (
    <Link key={video.id.videoId} to={"/watch?v=" + video.id.videoId}>
      <SearchVideoCard info={video} />
    </Link>
  ));

  return (
    <>
      {!error ? (
        <div className="p-1 grid grid-cols-container gap-4">
          {videos.length <= 0 ? <Shimmers /> : vids}
        </div>
      ) : (
        <p className="my-4">Error getting videos API Limit exceeded</p>
      )}
    </>
  );
}

export default SearchContainer;
