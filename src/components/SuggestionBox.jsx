import search from "/search.svg";
function SuggestionBox({ suggestions}) {
  return (
    <aside className="absolute rounded-lg py-3 bg-[#222] top-16 w-full max-w-2xl z-20 left-2/4 -translate-x-1/2">
      {suggestions.map((e, i) => (
        <p className="p-1 my-1 hover:bg-[#353535] font-medium" key={i}>
          <img src={search} className="invert inline w-5 mx-3" alt="" />
          <span>{e}</span>
        </p>
      ))}
    </aside>
  );
}

export default SuggestionBox;

