import search from "/search.svg";
import { Link } from "react-router-dom";
import { setQuery } from "../../utils/searchSlice";
import { useDispatch } from "react-redux";
import { setMobileSearch } from "../../utils/appSlice";
function SuggestionBox({ suggestions }) {
  const dispatch = useDispatch();

  return (
    <aside
      className="absolute rounded-lg py-3 bg-[#222] top-16 w-full max-w-xl z-20 left-2/4 -translate-x-1/2"
      onClick={() => {
        dispatch(setQuery(""));
        dispatch(setMobileSearch(false));
      }}
    >
      {suggestions.map((e, i) => (
        <Link key={i} to={"/search" + "?query=" + e}>
          <p className="p-1 my-1 hover:bg-[#353535] font-medium">
            <img src={search} className="invert inline w-5 mx-3" alt="" />
            <span>{e}</span>
          </p>
        </Link>
      ))}
    </aside>
  );
}

export default SuggestionBox;
