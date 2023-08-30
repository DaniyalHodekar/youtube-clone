import searchIcon from "/search.svg";
import { useDispatch } from "react-redux";
import { setMobileSearch } from "../../utils/appSlice";
function MobileSearchButton() {
  const dispatch = useDispatch();
  return (
    <button onClick={()=> {
      dispatch(setMobileSearch(true));
    }} className="ml-4">
      <img className="invert w-6" src={searchIcon} alt="logo" />
    </button>
  );
}

export default MobileSearchButton;