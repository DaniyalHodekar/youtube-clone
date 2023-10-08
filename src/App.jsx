import React, { Suspense } from "react";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "../utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/Profile";
import Loader from "./components/Loader";
import ChannelHome from "./components/channelpages/ChannelHome";
import ChannelPlaylist from "./components/channelpages/ChannelPlaylist";
import ChannelAbout from "./components/channelpages/ChannelAbout";
const CategoryVideos = React.lazy(() => import("./components/CategoryVideos"));
const SearchPage = React.lazy(() => import("./components/SearchPage"));
const WatchPage = React.lazy(() => import("./components/WatchPage"));
const ErrorElement = React.lazy(() => import("./components/ErrorElement"));
const Signup = React.lazy(() => import("./components/Signup"));
const MainContainer = React.lazy(() => import("./components/MainContainer"));
const Channel = React.lazy(() => import("./components/Channel"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorElement />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <MainContainer />
          </Suspense>
        ),
      },
      {
        path: "/watch",
        element: (
          <Suspense fallback={<Loader />}>
            <WatchPage />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<Loader />}>
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
          <Suspense fallback={<Loader />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "/category/",
        element: (
          <Suspense fallback={<Loader />}>
            <CategoryVideos />
          </Suspense>
        ),
      },
      {
        path: "/channel/:channelId",
        element: (
          <Suspense fallback={<Loader />}>
            <Channel />
          </Suspense>
        ),
        children: [
          {
            path: "/channel/:channelId",
            element: <ChannelHome />,
          },
          {
            path: "/channel/:channelId/playlists",
            element: <ChannelPlaylist />,
          },
          {
            path: "/channel/:channelId/about",
            element: <ChannelAbout />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div className="bg-[#0f0f0f] text-white font-Roboto h-screen flex flex-col">
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
