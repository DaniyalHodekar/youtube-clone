import React,{Suspense} from "react";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "../utils/store";
import {createBrowserRouter,RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Profile from "./components/Profile";
const CategoryVideos = React.lazy(() => import("./components/CategoryVideos"));
const SearchPage = React.lazy(() => import("./components/SearchPage"));
const WatchPage = React.lazy(() => import("./components/WatchPage"));
const ErrorElement = React.lazy(() => import("./components/ErrorElement"));
const Signup = React.lazy(() => import("./components/Signup"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    errorElement: (
      <Suspense fallback={<p>An error occured</p>}>
        <ErrorElement />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: (
          <Suspense fallback={<p>Loading..</p>}>
            <WatchPage />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<p>Loading..</p>}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<p>Loading..</p>}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "/category/",
        element: (
          <Suspense fallback={<p>Loading..</p>}>
            <CategoryVideos />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div className="bg-[#0a0a0a] text-white font-Roboto h-screen flex flex-col">
        <RouterProvider router={router}>
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
