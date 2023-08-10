import hamburger from "/icons8-menu.svg";
import ytLogo from "/youtube3.svg";
import { toggleMenu } from "../../utils/appSlice";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();

  function toggleMenuHandler(){
    dispatch(toggleMenu())
  }
  return (
    <aside className="p-2 absolute top-0 bottom-0 left-0 z-30 bg-[#111] bg-opacity-80 w-[300px] backdrop-blur-sm">
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
        <img className="invert w-9" src={ytLogo} alt="logo" />
      </div>
      <p className="p-2 border-b border-[#555] font-medium">Explore</p>
      <ul className="p-2 border-b border-[#555]">
        <li>Trending</li>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Learning</li>
        <li>Computer Programming</li>
        <li>Movies</li>
        <li>News</li>
      </ul>
      <section className="p-2 font-medium">Footer</section>
    </aside>
  );
}
