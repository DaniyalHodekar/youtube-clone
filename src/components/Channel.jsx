import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Loader from "./Loader";
import { CHANNEL_DETAILS_API, PLAYLIST_API } from "../../utils/constants";
import ChannelHeader from "./channelpages/ChannelHeader";

export default function Channel() {
  const [data, setData] = useState(null);

  async function getChannelInfo(channelId) {
    let res = await fetch(CHANNEL_DETAILS_API + channelId);
    let json = await res.json();
    // console.log(json);
    setData(json);
  }

  const channelId = useParams();

  useEffect(() => {
    getChannelInfo(channelId.channelId);
  }, [channelId.channelId]);

  return (
    <main className="max-w-7xl lg:mx-auto py-8">
      {data ? <ChannelHeader data={data} /> : <Loader />}
      <div className="my-7 md:my-12 uppercase text-sm text-[#aaa] tracking-wide font-medium">
        <nav>
          <NavLink
            to={"/channel/" + channelId.channelId}
            end
            className="px-7 py-3 md:hover:text-white"
          >
            Home
          </NavLink>
          <NavLink
            to={`/channel/${channelId.channelId}/playlists`}
            className="px-7 py-3 md:hover:text-white"
          >
            Playlists
          </NavLink>
          <NavLink
            to={`/channel/${channelId.channelId}/about`}
            className="px-7 py-3 md:hover:text-white"
          >
            About
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </main>
  );
}
