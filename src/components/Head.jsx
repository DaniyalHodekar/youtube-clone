import hamburger from "/icons8-menu.svg";
import ytLogo from "/youtube3.svg";
import searchIcon from "/search.svg";
import userIcon from "/icons8-male-user-32.png";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../utils/appSlice";
import { useEffect, useState } from "react";
import { SEARCH_SUGGEST_API } from "../../utils/constants";
import SuggestionBox from "./SuggestionBox";
import SearchOverlay from "./SearchOverlay";
import { setQuery, cacheResults } from "../../utils/searchSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function Head() {
  const [suggestions, setSuggestions] = useState([]);
  let cache = useSelector((store) => store.search.cache);
  let query = useSelector((store) => store.search.query);
  const dispatch = useDispatch();
  //lets cache our search suggestions so api wont get called again for same input

  useEffect(() => {
    let id;
    if (cache[query]) {
        setSuggestions(cache[query]);
      } else {
        id = setTimeout(() => {
          getSearchResults(query);
        }, 300);
      }

    return function () {
      clearTimeout(id);
    };
  }, [query]);

  async function getSearchResults(query) {
    if (query.trim() == "") {
      setSuggestions([]);
      return;
    }
    let data = await fetch(SEARCH_SUGGEST_API + query);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(cacheResults(json[1]));
  }


  function toggleMenuHandler() {
    dispatch(toggleMenu());
  }

  return (
    <header className="p-2 grid grid-cols-[1fr_2fr_1fr] items-center gap-1 ">
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
        <a href="/">
          <img className="invert w-9" src={ytLogo} alt="logo" />
        </a>
      </div>
      <div className="flex justify-center ml-2">
        <input
          type="text"
          className="bg-transparent border border-[#444] p-2 px-4 rounded-full rounded-r-none w-4/5 focus:border-sky-600 outline-none max-w-xl"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            dispatch(setQuery(e.target.value));
          }}
        />
        <button className="border rounded-full border-[#444] rounded-l-none border-l-0 px-4 bg-[#252525]">
          <img src={searchIcon} alt="search" className="invert w-6" />
        </button>
      </div>
      <div>
        <img className="invert ml-auto mr-4" src={userIcon} alt="" />
      </div>
      {suggestions.length > 0 && <SuggestionBox suggestions={suggestions} />}
      {suggestions.length > 0 && (
        <SearchOverlay setSuggestions={setSuggestions} />
      )}
    </header>
  );
}
