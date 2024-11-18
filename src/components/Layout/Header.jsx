import { useLocation } from "react-router-dom";

import SignInButton from "../Button/SignInButton";
import Logo from "../Common/Logo";

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <header className="flex-center fixed top-0 z-header w-full border-b-1 bg-white shadow-sm">
      <div
        className={`flex items-center justify-between mt-2 h-64 w-full ${pathName === "/" ? "px-50" : "max-w-1150 px-40"}`}
      >
        <Logo styles="p-5 m-10 w-50 h-50" destination="/" />
        <SignInButton />
      </div>
    </header>
  );
};

export default Header;
