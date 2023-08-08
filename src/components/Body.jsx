import MainContainer from "./MainContainer";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function Body() {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  const gridStyle = isMenuOpen
    ? "grid grid-cols-[250px_1fr] overflow-y-auto"
    : "grid overflow-y-auto";
  return (
    <div className={gridStyle}>
      {isMenuOpen && <Sidebar />}
      <MainContainer />
    </div>
  );
}
