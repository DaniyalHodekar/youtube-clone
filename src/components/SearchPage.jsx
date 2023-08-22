import { useSearchParams } from "react-router-dom";
function SearchPage() {
  const [params] = useSearchParams();
  let ok = params.get("query");
  return <div>Showing search results for {ok}</div>;
}

export default SearchPage;
