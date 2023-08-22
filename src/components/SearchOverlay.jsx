
function SearchOverlay({setSuggestions}) {
  return (
    <div onClick={()=> setSuggestions([])} className="absolute inset-0 z-10 top-14 h-[calc(100dvh - 3.5rem)] bg-black bg-opacity-30"></div>
  )
}

export default SearchOverlay;