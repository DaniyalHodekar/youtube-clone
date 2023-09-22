import hamburger from "/icons8-menu.svg";
import { toggleMenu } from "../../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { memo } from "react";

export default function Sidebar() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const subscriptions = useSelector((store) => store.login.subscriptions);
  let position = isMenuOpen ? "left-0" : "-left-80";
  function toggleMenuHandler() {
    dispatch(toggleMenu());
  }
  return (
    <aside
      className={`p-[0.35rem] absolute top-0 h-[100dvh] ${position} z-30 bg-[#111] w-[250px] transition-all ease-in-out duration-300 flex flex-col`}
    >
      <div className="flex gap-3 items-center ml-1">
        <button
          className="p-3 rounded-full hover:bg-[#333]"
          onClick={() => toggleMenuHandler()}
        >
          <img
            className="invert cursor-pointer w-5"
            src={hamburger}
            alt="hamburger"
          />
        </button>
        <Link
          to="/"
          className="w-[90px]"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuHandler();
          }}
        >
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col grow overflow-y-scroll">
        <nav className="grow p-2 border-b border-[#555] text-sm">
          <div>
            <p className="p-2 mb-2 border-b border-[#555] font-medium text-base">
              Explore
            </p>
            <ExploreLinks toggleMenuHandler={toggleMenuHandler} />
          </div>
          <div className="mt-5">
            <p className="p-2 mb-2 border-b border-[#555] font-medium text-base">
              Subscriptions
            </p>
            {subscriptions.length > 0 ? (
              <Subscriptions subscriptions={subscriptions} />
            ) : (
              <p className="p-2 mb-2 ">No Subscriptions</p>
            )}
          </div>
          <footer className="p-2 text-xs pt-4 mt-2 border-t border-[#555]">
            <p className="whitespace-normal font-Roboto text-[#999] select-none">
              This project has been developed solely for educational purposes
              and utilizes YouTube&apos;s data API to present video content. It
              is imperative to acknowledge that{" "}
              <span className="font-medium text-white">
                all videos and their associated content featured within this
                project exclusively belong to their respective creators and
                YouTube.
              </span>{" "}
              There is no intention, whatsoever, to engage in any form of
              content appropriation or copyright infringement.
            </p>
            <p className="text-zinc-500 mt-3 select-none">
              Project by{" "}
              <a
                href="https://www.linkedin.com/in/daniyalhodekar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500"
              >
                Daniyal Hodekar
              </a>
            </p>
          </footer>
        </nav>
      </div>
    </aside>
  );
}

const Subscriptions = memo(function Subscriptions({ subscriptions }) {
  return (
    <ul>
      {subscriptions.map((channel) => (
        <li key={channel}>
          <Link
            to=""
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center p-2 hover:bg-[#333] rounded-md">
              <span className="ml-5">{channel}</span>
              <div
                id="newness-dot"
                className="w-1 h-1 rounded-full bg-sky-500 ml-4"
              ></div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
});

function ExploreLinks({ toggleMenuHandler }) {
  return (
    <ul>
      <li>
        <Link
          to="category?id=0&page=Trending"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuHandler();
          }}
        >
          <div className="flex items-center p-2 hover:bg-[#333] rounded-md">
            <svg
              height="25"
              viewBox="0 0 24 24"
              width="25"
              focusable="false"
              fill="currentColor"
            >
              <path d="M19 3.87v9.77C19 17.7 15.86 21 12 21s-7-3.3-7-7.37v-.13c0-1.06.22-2.13.62-3.09.5-1.19 1.29-2.21 2.27-2.97.85-.66 1.83-1.14 2.87-1.65.39-.19.77-.38 1.15-.58.36-.19.72-.38 1.08-.56v3.22l1.55-1.04L19 3.87M20 2l-6 4V3c-.85.44-1.7.88-2.55 1.33-1.41.74-2.9 1.34-4.17 2.32-1.13.87-2.02 2.05-2.58 3.37-.46 1.09-.7 2.29-.7 3.48v.14C4 18.26 7.58 22 12 22s8-3.74 8-8.36V2zM9.45 12.89 14 10v5.7c0 1.82-1.34 3.3-3 3.3s-3-1.47-3-3.3c0-1.19.58-2.23 1.45-2.81z"></path>
            </svg>
            <span className="ml-5">Trending</span>
          </div>
        </Link>
      </li>
      <li>
        <Link
          to="category?id=1&page=Film%20and%20animation"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuHandler();
          }}
        >
          <div className="flex items-center p-2 hover:bg-[#333] rounded-md">
            <svg
              height="25"
              viewBox="0 0 24 24"
              width="25"
              focusable="false"
              fill="currentColor"
            >
              <path d="m22.01 4.91-.5-2.96L1.64 5.19 2 8v13h20V8H3.06l18.95-3.09zM5 9l1 3h3L8 9h2l1 3h3l-1-3h2l1 3h3l-1-3h3v11H3V9h2z"></path>
            </svg>
            <span className="ml-5">Film and Animation</span>
          </div>
        </Link>
      </li>
      <li>
        <Link
          to="category?id=17&page=Sports"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuHandler();
          }}
        >
          <div className="flex items-center p-2 hover:bg-[#333] rounded-md">
            <svg
              height="25"
              viewBox="0 0 24 24"
              width="25"
              focusable="false"
              fill="currentColor"
            >
              <path d="M18 5V2H6v3H3v6l3.23 1.61c.7 2.5 2.97 4.34 5.69 4.38L8 19v3h8v-3l-3.92-2.01c2.72-.04 4.99-1.88 5.69-4.38L21 11V5h-3zM6 11.38l-2-1V6h2v5.38zM15 21H9v-1.39l3-1.54 3 1.54V21zm2-10c0 2.76-2.24 5-5 5s-5-2.24-5-5V3h10v8zm3-.62-2 1V6h2v4.38z"></path>
            </svg>
            <span className="ml-5">Sports</span>
          </div>
        </Link>
      </li>
      <li>
        <Link
          to="category?id=10&page=Music"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuHandler();
          }}
        >
          <div className="flex items-center p-2 hover:bg-[#333] rounded-md">
            <svg
              height="25"
              viewBox="0 0 24 24"
              width="25"
              focusable="false"
              fill="currentColor"
            >
              <path d="M12 4v9.38c-.73-.84-1.8-1.38-3-1.38-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V8h6V4h-7zM9 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm9-12h-5V5h5v2z"></path>
            </svg>
            <span className="ml-5">Music</span>
          </div>
        </Link>
      </li>
      <li>
        <Link
          to="category?id=20&page=Gaming"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuHandler();
          }}
        >
          <div className="flex items-center p-2 hover:bg-[#333] rounded-md">
            <svg
              height="25"
              viewBox="0 0 24 24"
              width="25"
              focusable="false"
              fill="currentColor"
            >
              <path d="M10 12H8v2H6v-2H4v-2h2V8h2v2h2v2zm7 .5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm3-3c0-.83-.67-1.5-1.5-1.5S17 8.67 17 9.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-3.03-4.35-4.5 2.53-.49.27-.49-.27-4.5-2.53L3 7.39v6.43l8.98 5.04 8.98-5.04V7.39l-3.99-2.24m0-1.15 4.99 2.8v7.6L11.98 20 2 14.4V6.8L6.99 4l4.99 2.8L16.97 4z"></path>
            </svg>
            <span className="ml-5">Gaming</span>
          </div>
        </Link>
      </li>
      <li>
        <Link
          to="category?id=22&page=People%20and%20Vlogs"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuHandler();
          }}
        >
          <div className="flex items-center p-2 hover:bg-[#333] rounded-md">
            <svg
              height="25"
              viewBox="0 0 24 24"
              width="25"
              focusable="false"
              fill="currentColor"
            >
              <g>
                <path d="M14 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM8.48 8.45l-.71-.7C6.68 8.83 6 10.34 6 12s.68 3.17 1.77 4.25l.71-.71C7.57 14.64 7 13.39 7 12s.57-2.64 1.48-3.55zm7.75-.7-.71.71c.91.9 1.48 2.15 1.48 3.54s-.57 2.64-1.48 3.55l.71.71C17.32 15.17 18 13.66 18 12s-.68-3.17-1.77-4.25zM5.65 5.63l-.7-.71C3.13 6.73 2 9.24 2 12s1.13 5.27 2.95 7.08l.71-.71C4.02 16.74 3 14.49 3 12s1.02-4.74 2.65-6.37zm13.4-.71-.71.71C19.98 7.26 21 9.51 21 12s-1.02 4.74-2.65 6.37l.71.71C20.87 17.27 22 14.76 22 12s-1.13-5.27-2.95-7.08z"></path>
              </g>
            </svg>
            <span className="ml-5">People and Vlogs</span>
          </div>
        </Link>
      </li>
      <li>
        <Link
          to="category?id=25&page=News%20and%20Politics"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuHandler();
          }}
        >
          <div className="flex items-center p-2 hover:bg-[#333] rounded-md">
            <svg
              height="25"
              viewBox="0 0 24 24"
              width="25"
              focusable="false"
              fill="currentColor"
            >
              <path d="M11 11v6H7v-6h4m1-1H6v8h6v-8zM3 3.03V21h14l4-4V3.03M20 4v11.99l-.01.01H16v3.99l-.01.01H4V4h16zm-2 4H6V6h12v2zm0 7h-5v-2h5v2zm0-3h-5v-2h5v2z"></path>
            </svg>
            <span className="ml-5">News and Politics</span>
          </div>
        </Link>
      </li>
    </ul>
  );
}
