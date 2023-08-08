import Head from "./components/Head";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "../utils/store";
function App() {

  return (
    <Provider store={store}>
      <div className="bg-[#121212] text-white font-Roboto h-screen flex flex-col">
        <Head />
        <Body />
      </div>
    </Provider>
  );
}

export default App;

/**
 * 
 * Head 
 * Body 
 *  Sidebar
 *    Menuitems
 * MainContent
 *   Recommended Buttons
 *    VideoContainer
 *      Cards
 * 
 */
