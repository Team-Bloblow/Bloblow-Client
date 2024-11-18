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
      <div className="mt-2 flex h-64 w-full max-w-1150 items-center justify-between px-40">
        <Logo styles="text-36" destination="/" />
        <div className="flex-center gap-15">
          {isSignIn && (
            <div className="flex-center gap-5">
              <ProfileIcon size="w-35 h-35 lg:w-35 lg:h-35" photoURL={userInfo.photoURL} />
              <p className="text-15 font-semibold">{userInfo.displayName}</p>
            </div>
          )}
          <SignInButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
