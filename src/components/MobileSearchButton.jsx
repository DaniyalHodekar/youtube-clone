import searchIcon from "/search.svg";
function MobileSearchButton({ setMobileSearchVisible }) {
  return (
    <button onClick={()=> {
      setMobileSearchVisible(true);
    }} className="relative right-10">
      <img className="invert w-6" src={searchIcon} alt="logo" />
    </button>
  );
}

export default MobileSearchButton;