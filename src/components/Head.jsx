import hamburger from "/icons8-menu.svg";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../utils/appSlice";
import { useEffect, useState } from "react";
import { SEARCH_SUGGEST_API } from "../../utils/constants";
import SuggestionBox from "./SuggestionBox";
import SearchOverlay from "./SearchOverlay";
import { setQuery, cacheResults } from "../../utils/searchSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MobileSearchButton from "./MobileSearchButton";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import Logo from "./Logo";
import { setMobileSearch } from "../../utils/appSlice";

export default function Head() {
  const [suggestions, setSuggestions] = useState([]);
  let cache = useSelector((store) => store.search.cache);
  let query = useSelector((store) => store.search.query);
  let loggedin = useSelector((store) => store.login.isLoggedIn);

  const dispatch = useDispatch();
  let [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const mobileSearchVisible = useSelector(
    (store) => store.app.isMobileSearchOpen
  );
  //lets cache our search suggestions so api wont get called again for same input

  useEffect(() => {
    let id;
    if (query.trim() === "") {
      setSuggestions([]);
    } else if (cache[query]) {
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

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return function () {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

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
    <>
      {mobileSearchVisible ? (
        <header className="fixed top-0 left-0 right-0 bg-[#0a0a0a] flex p-2 px-5 gap-2 z-10">
          <button
            onClick={() => {
              dispatch(setMobileSearch(false));
              dispatch(setQuery(""));
              setSuggestions([]);
            }}
          >
            Back
          </button>
          <SearchForm />
        </header>
      ) : (
        <header className="fixed top-0 left-0 right-0 p-[0.35rem] flex justify-between sm:grid sm:grid-cols-[1fr_2fr_1fr] items-center gap-1 z-10 bg-[#0a0a0a]">
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
            <Link className="w-[90px]" to="/">
              <Logo />
            </Link>
          </div>
          {windowWidth < 600 ? <MobileSearchButton /> : <SearchForm />}
          <Link
            to={loggedin ? "/profile" : "/signup"}
            className="ml-auto mr-2 rounded-full border-[#444] border p-1 px-2 hover:bg-sky-950 flex items-center gap-2"
          >
            <svg
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              style={{
                fill: "rgb(14, 165, 233)",
              }}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1c4.96 0 9 4.04 9 9 0 1.42-.34 2.76-.93 3.96-1.53-1.72-3.98-2.89-7.38-3.03A3.996 3.996 0 0016 9c0-2.21-1.79-4-4-4S8 6.79 8 9c0 1.97 1.43 3.6 3.31 3.93-3.4.14-5.85 1.31-7.38 3.03C3.34 14.76 3 13.42 3 12c0-4.96 4.04-9 9-9zM9 9c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3zm3 12c-3.16 0-5.94-1.64-7.55-4.12C6.01 14.93 8.61 13.9 12 13.9c3.39 0 5.99 1.03 7.55 2.98C17.94 19.36 15.16 21 12 21z"></path>
            </svg>
            {!loggedin && <p className="text-sky-500 text-sm whitespace-nowrap mr-1">
              Sign in
            </p>}
          </Link>
        </header>
      )}
      {suggestions.length > 0 && <SuggestionBox suggestions={suggestions} />}
      {suggestions.length > 0 && (
        <SearchOverlay setSuggestions={setSuggestions} />
      )}
    </>
  );
}
