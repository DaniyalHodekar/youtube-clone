import hamburger from "/icons8-menu.svg";
import ytLogo from "/youtube3.svg";
import searchIcon from "/search.svg";
import userIcon from "/icons8-male-user-32.png";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../utils/appSlice";

export default function Head() {
const dispatch = useDispatch();
  function toggleMenuHandler(){
    dispatch(toggleMenu());
  }

  return (
    <header className="p-2 grid grid-cols-[1fr_2fr_1fr] items-center gap-1">
      <div className="flex gap-3 items-center">
        <button
          className="p-3 rounded-full hover:bg-[#333] ml-1"
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
      <div className="flex justify-center ml-2">
        <input
          type="text"
          className="bg-transparent border border-[#444] p-2 px-4 rounded-full rounded-r-none w-4/5 focus:border-sky-600 outline-none max-w-xl"
          placeholder="Search"
        />
        <button className="border rounded-full border-[#444] rounded-l-none border-l-0 px-4 bg-[#252525]">
          <img src={searchIcon} alt="search" className="invert w-6" />
        </button>
      </div>
      <div>
        <img className="invert ml-auto mr-4" src={userIcon} alt="" />
      </div>
    </header>
  );
}
