import { useSearchParams } from "react-router-dom";
import SearchContainer from "./SearchContainer";
function SearchPage() {
  const [params] = useSearchParams();
  let ok = params.get("query");
  return (
    <div>
      <p className="my-4">Showing search results for {ok}</p>
      <SearchContainer params={ok}/>
    </div>
  );
}

export default SearchPage;
