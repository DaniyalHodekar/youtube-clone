import { useRef } from "react";
import { Link } from "react-router-dom";
function Signin() {
  let inputRef = useRef(null);
  let passwordRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      inputRef.current.value.trim() === "" ||
      passwordRef.current.value.trim() === ""
    ) {
      return;
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-sm pr-2 overflow-hidden flex-col justify-center">
      <div>
        <img width={"400px"} height={"200px"} className="bg-[#333]" src="https://unsplash.it/400/200" alt="placeholder" />
      </div>
      <form
        className="bg-[#222] p-6 flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold tracking-wider text-2xl">Login</h2>
        <div>
          <label className="text-sm" htmlFor="username">
            Username
          </label>
          <br />
          <input
            className="bg-transparent border border-[#555] p-[0.25rem] px-2 rounded-md w-full focus:border-sky-600 outline-none"
            type="text"
            ref={inputRef}
            id="username"
          />
        </div>
        <div>
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <br />
          <input
            className="bg-transparent border border-[#555] p-[0.25rem] px-2 w-full rounded-md focus:border-sky-600 outline-none"
            type="password"
            id="password"
            ref={passwordRef}
          />
        </div>
        <button className="text-sky-500 rounded-full border-[#444] border p-1 px-2 hover:bg-sky-950">
          Log In
        </button>
        <p className="text-sm">
          First Time? Sign up&nbsp;
          <Link className="text-sky-500" to="/signup">
            here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;