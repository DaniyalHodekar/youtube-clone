import Sidebar from "./Sidebar";
import Head from "./Head";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Overlay from "./Overlay";
import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Body() {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const targetRef = useRef(null);
  useEffect(() => {
    window.onbeforeunload = function () {
      return "This will end your session";
    };
  }, []);
  return (
    <div className="overflow-y-auto md:px-4 pl-1" ref={targetRef}>
      <Head />
      <Sidebar />
      {isMenuOpen && <Overlay />}
      <Outlet context={targetRef} />
    </div>
  );
}
