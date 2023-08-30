import { useDispatch } from "react-redux";
import { LOCAL_STORAGE_KEY } from "./constants";
import { setLogin } from "./loginSlice";

export function useLogin() {
  const dispatch = useDispatch();
  let details = localStorage.getItem(LOCAL_STORAGE_KEY) ?? false;
  if (details) {
    dispatch(setLogin());
  }
  return {
    isLoggedIn: !!details,
    data: details,
  };
}
