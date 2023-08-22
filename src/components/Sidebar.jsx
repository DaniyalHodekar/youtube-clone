import hamburger from "/icons8-menu.svg";
import ytText from "/youtubeText.svg";
import { toggleMenu } from "../../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  let position = isMenuOpen ? "left-0" : "-left-80";
  function toggleMenuHandler() {
    dispatch(toggleMenu());
  }
  return (
    <aside
      className={`p-[0.35rem] absolute top-0 h-[100dvh] ${position} z-30 bg-[#111] w-[250px] transition-all ease-in-out duration-300 flex flex-col`}
    >
      <div className="flex gap-3 items-center ml-1">
        <button
          className="p-3 rounded-full hover:bg-[#333]"
          onClick={() => toggleMenuHandler()}
        >
          <img
            className="invert cursor-pointer w-5"
            src={hamburger}
            alt="hamburger"
          />
        </button>
        <Link to="/" onClick={(e) =>{
          e.stopPropagation();
          toggleMenuHandler();
        } }>
          <img className="invert w-[90px]" src={ytText} alt="logo" />
        </Link>
      </div>
      <div className="flex flex-col grow overflow-y-scroll">
        <p className="p-2 border-b border-[#555] font-medium">Explore</p>
        <ul className="grow p-2 border-b border-[#555]">
          <li>Trending</li>
          <li>Music</li>
          <li>Sports</li>
          <li>Gaming</li>
          <li>Learning</li>
          <li>Computer Programming</li>
          <li>Movies</li>
          <li>News</li>
        </ul>
        <section className="p-2 text-xs">
          <p className="whitespace-normal font-Roboto text-[#999] select-none">
            This project has been developed solely for educational purposes and
            utilizes the YouTube API to present video content. It is imperative
            to acknowledge that{" "}
            <span className="font-medium text-white">
              all videos and their associated content featured within this
              project exclusively belong to their respective creators and
              YouTube.
            </span>{" "}
            There is no intention, whatsoever, to engage in any form of content
            appropriation or copyright infringement.
          </p>
          <p className="text-zinc-500 mt-3 select-none">Project by Daniyal Hodekar</p>
        </section>
      </div>
    </aside>
  );
}
