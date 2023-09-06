import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RelatedVideoCard from "./RelatedVideoCard";
import { VIDEO_INFO_API1 } from "../../utils/constants";
import { Link } from "react-router-dom";

const key = "&key=AIzaSyC5htb0LtlNokBQEdAIQ95nell3pm0LcQk";

function Profile() {
  const loggedIn = useSelector((store) => store.login.isLoggedIn);

  return (
    <div className="px-1">
      {loggedIn ? <ProfilePage /> : <p>Login to access Profile</p>}
    </div>
  );
}

export default Profile;

function ProfilePage() {
  const userName = useSelector((store) => store.login.name);
  const likedVideos = useSelector((store) => store.login.likedVideos);
  const subscriptions = useSelector((store) => store.login.subscriptions);
  const [data, setData] = useState([]);

  useEffect(() => {
    getLikedVideos();
  }, []);

  async function getLikedVideos() {
    if (likedVideos.length === 0) return;
    let res = await fetch(VIDEO_INFO_API1 + likedVideos.join(",") + key);
    let json = await res.json();
    setData(json.items);
  }

  return (
    <div className="max-w-5xl mx-auto mb-5">
      <h1 className="text-xl font-medium mt-2">{userName}&apos;s Profile</h1>
      <h2 className="my-4">Liked Videos:</h2>
      {likedVideos.length > 0 ? (
        <div className="flex flex-col gap-2">
          {data.length > 0 ? (
            <>
              {data.map((video) => (
                <Link key={video.id} to={"/watch?v=" + video.id}>
                  <RelatedVideoCard info={video} />
                </Link>
              ))}
            </>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      ) : (
        <p>No liked Videos</p>
      )}
      <h2 className="my-4">Subscriptions:</h2>
      {subscriptions.length > 0 ? (
        <ul className="text-sm list-decimal pl-3">
          {subscriptions.map((sub) => {
            return <li key={sub}>{sub}</li>;
          })}
        </ul>
      ) : (
        <p>No Subscriptions</p>
      )}
    </div>
  );
}
