import MainContainer from "./MainContainer";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Overlay from "./Overlay";

export default function Body() {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  return (
    <div className="overflow-y-auto px-4">
      {isMenuOpen && <Sidebar />}
      {isMenuOpen && <Overlay />}
      <MainContainer />
    </div>
  );
}
