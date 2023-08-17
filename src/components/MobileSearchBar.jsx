import ytLogo from "/youtubeLogo.svg"
function MobileSearchBar({width}) {
  return (
    <div className="p-[0.35rem]">
      MobileSearchBar {width}
      <a href="/">
        <img className="invert w-[90px]" src={ytLogo} alt="logo" />
      </a>
    </div>
  );
}

export default MobileSearchBar;