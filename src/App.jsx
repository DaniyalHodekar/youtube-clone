import Head from "./components/Head";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "../utils/store";
import WatchPage from "./components/WatchPage";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import ErrorElement from "./components/errorElement";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Body/>,
    errorElement:<ErrorElement/>,
    children:[
      {
        path:"/",
        element:<MainContainer/>
      },
      {
        path:"/watch",
        element:<WatchPage/>
      }
    ]
  }
])

function App() {

  return (
    <Provider store={store}>
      <div className="bg-[#121212] text-white font-Roboto h-screen flex flex-col">
        <Head />
        <RouterProvider router = {router}>
          <Body />
        </RouterProvider>
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
