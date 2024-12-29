import { useLocation } from "react-router-dom";

import useBoundStore from "../../store/client/useBoundStore";
import SignInButton from "../Button/SignInButton";
import Logo from "../Common/Logo";
import ProfileIcon from "../Icon/ProfileIcon";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const userInfo = useBoundStore((state) => state.userInfo);
  const isSignIn = useBoundStore((state) => state.isSignIn);

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="flex-center fixed top-0 z-header w-full border-b-1 bg-white shadow-sm">
      <div className="mt-2 flex h-64 w-full max-w-1440 items-center justify-between px-20">
        <Logo styles="text-26 md:text-36" destination="/" />
        <div className="flex-center gap-10 md:gap-30">
          {isSignIn && (
            <div className="flex-center gap-8">
              <ProfileIcon size="w-28 h-28 md:w-35 md:h-35" photoURL={userInfo.photoURL} />
              <p className="hidden md:block text-15 font-semibold">{userInfo.displayName}</p>
            </div>
          )}
          <SignInButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
