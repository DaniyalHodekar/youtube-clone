import { useRouteError, Link } from "react-router-dom";

function ErrorElement() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="mx-auto my-16 text-xl">
      <p className=" text-lg font-medium">An Error occured</p>
      <p className="p-3">{error.status} - {error.data}</p>
      <Link to="/" className="text-base bg-[#333] px-3 py-2 rounded-md hover:bg-[#444] transition-colors">Back to home</Link>
    </div>
  );
}

export default ErrorElement;
