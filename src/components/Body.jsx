import Sidebar from "./Sidebar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Overlay from "./Overlay";
import { Outlet } from "react-router-dom";

export default function Body() {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  return (
    <div className="overflow-y-auto md:px-4 pl-2">
      <Sidebar />
      {isMenuOpen && <Overlay />}
      <Outlet/>
    </div>
  );
}
