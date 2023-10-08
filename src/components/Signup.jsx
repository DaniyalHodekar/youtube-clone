import { useState, useRef } from "react";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setName, setLogin } from "../../utils/loginSlice";

function Signup() {
  const [text, setText] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const nameRef = useRef(null);
  const passRef = useRef(null);
  const dispatch = useDispatch();

  function handleGuest() {
    nameRef.current.value = "AnonymousUser69";
    passRef.current.value = "helloWorld420";
  }

  function handleSubmit(e) {
    const nameLength = nameRef.current.value.length;
    const passLength = passRef.current.value.length;

    const nameCheck = nameLength < 8 || nameLength > 15;
    const passwordCheck = passLength < 8 || passLength > 15;

    if (nameCheck) {
      setNameError(true);
      e.preventDefault();
    } else {
      setNameError(false);
    }

    if (passwordCheck) {
      setPasswordError(true);
      e.preventDefault();
    } else {
      setPasswordError(false);
    }

    if (!nameCheck && !passwordCheck) {
      dispatch(setName(nameRef.current.value));
      dispatch(setLogin());
    }
  }

  return (
    <div className="mx-auto mt-24 max-w-md overflow-hidden flex-col justify-center border px-6 py-12 border-[#222] bg-[#111] rounded-xl">
      <Form action="/profile" onSubmit={handleSubmit}>
        <h2 className="font-bold tracking-wider text-2xl mb-4">Sign up</h2>
        <h3 className="mb-4 text-sm font-medium text-neutral-400">
          Access Liked Videos and Subscriptions
        </h3>
        <div>
          <label className="text-sm" htmlFor="username">
            Username
          </label>
          <br />
          <input
            className="bg-transparent border border-[#444] p-2 px-3 rounded-md w-full focus:border-sky-600 outline-none mb-4 mt-1"
            type="text"
            autoComplete="off"
            id="username"
            ref={nameRef}
          />
          {nameError && (
            <p className="text-red-500 text-sm mb-2">
              Username must be between 8 to 15 characters
            </p>
          )}
        </div>
        <div className="relative">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <br />
          <input
            className="bg-transparent border border-[#444] p-2 px-3 w-full rounded-md focus:border-sky-600 outline-none mb-2 mt-1"
            type={text ? "text" : "password"}
            id="password"
            ref={passRef}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mb-2">
              Password must be between 8 to 15 characters
            </p>
          )}
          <button
            className="text-sm"
            type="button"
            onClick={() => {
              setText(!text);
            }}
          >
            {text ? "Hide" : "Show"} password
          </button>
        </div>
        <button
          type="submit"
          className="text-sky-500 rounded-full border-[#333] border p-1.5 px-4 hover:bg-sky-950 mt-4 mr-4 text-sm"
        >
          Sign up
        </button>
        <button
          type="button"
          className="text-sky-500 rounded-full border-[#333] border p-1.5 px-4 hover:bg-sky-950 mt-4 text-sm"
          onClick={handleGuest}
        >
          Use guest credentials
        </button>
      </Form>
    </div>
  );
}

export default Signup;
