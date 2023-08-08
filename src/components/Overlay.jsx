import { toggleMenu } from "../../utils/appSlice"
import { useDispatch } from "react-redux"

function Overlay() {
    const dispatch = useDispatch();
    function toggleMenuHandler(){
        dispatch(toggleMenu());
    }
  return (
    <div 
    onClick={()=>toggleMenuHandler()}
     className=" absolute inset-0 bg-[#111] bg-opacity-60 z-10"></div>
  )
}

export default Overlay