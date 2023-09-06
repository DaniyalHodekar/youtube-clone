import { useSearchParams } from "react-router-dom";
import SearchContainer from "./SearchContainer";
function SearchPage() {
  const [params] = useSearchParams();
  let ok = params.get("query");
  return (
    <div>
      <p className="my-4">
        Showing search results for{" "}
        <span className="font-medium">&apos;{ok}&apos;</span>
      </p>
      <SearchContainer params={ok} />
    </div>
  );
}

export default SearchPage;
