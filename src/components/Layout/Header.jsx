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
    <header className="flex items-center justify-between fixed top-0 mt-2 py-10 marker:z-header h-64 w-full border-b-1 bg-white shadow-sm px-130">
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
    </header>
  );
};

export default Header;
