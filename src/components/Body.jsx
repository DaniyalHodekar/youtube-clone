import Sidebar from "./Sidebar";
import Head from "./Head";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Overlay from "./Overlay";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function Body() {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  useEffect(() => {
    window.onbeforeunload = function () {
      return "This will end your session";
    };
  }, []);
  return (
    <div className="overflow-y-auto md:px-4 pl-2 mt-14">
      <Head />
      <Sidebar />
      {isMenuOpen && <Overlay />}
      <Outlet />
    </div>
  );
}
