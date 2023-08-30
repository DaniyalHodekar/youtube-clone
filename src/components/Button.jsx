import { Link } from "react-router-dom"

function Button({name}) {
  
  return (
    <Link to={"/search?query=" + name}className="transition-colors duration-300 whitespace-nowrap bg-[#2F2F2F] p-1.5 px-3 rounded-md text-sm hover:bg-[#444]">{name}</Link>
  )
}
export default Button;