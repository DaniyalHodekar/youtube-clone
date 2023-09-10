import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../utils/searchSlice";
import searchIcon from "/search.svg";
import { setMobileSearch } from "../../utils/appSlice";
export default function SearchForm() {
  const query = useSelector((store) => store.search.query);
  const dispatch = useDispatch();

  return (
    <Form
      action="/search"
      className="grow"
      onSubmit={(e) => {
        if (query.trim() === "") {
          e.preventDefault();
        }
        dispatch(setQuery(""));
        dispatch(setMobileSearch(false));
      }}
    >
      <div className="flex justify-center ml-2">
        <input
          type="text"
          className="bg-transparent border border-[#353535] p-[0.35rem] px-4 rounded-full rounded-r-none w-4/5 focus:border-sky-600 outline-none max-w-xl"
          placeholder="Search"
          value={query}
          name="query"
          autoComplete="off"
          onChange={(e) => {
            dispatch(setQuery(e.target.value));
          }}
        />
        <button
          type="submit"
          className="border rounded-full border-[#353535] rounded-l-none border-l-0 px-5 bg-[#252525]"
        >
          <img src={searchIcon} alt="search" className="invert w-6" />
        </button>
      </div>
    </Form>
  );
}
