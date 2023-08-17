import hamburger from "/icons8-menu.svg";
import ytLogo from "/youtubeLogo.svg";
import { toggleMenu } from "../../utils/appSlice";
import { useDispatch,useSelector } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  let position = isMenuOpen ? "left-0" : "-left-80"
  function toggleMenuHandler(){
    dispatch(toggleMenu())
  }
  return (
    <aside
      className={`p-[0.35rem] absolute top-0 bottom-0 ${position} z-30 bg-[#111] bg-opacity-80 w-[250px] backdrop-blur-sm transition-all ease-in-out duration-300`}
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
        <a href="/">
          <img className="invert w-[90px]" src={ytLogo} alt="logo" />
        </a>
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
