import SignInButton from "../Button/SignInButton";
import Logo from "../Common/Logo";

const Header = () => {
  return (
    <header className="flex-center fixed top-0 z-header w-full border-b-1 bg-white shadow-sm">
      <div className="mt-2 flex h-64 w-full max-w-1150 items-center justify-between px-40">
        <Logo styles="text-36" type="nav" destination="/" />
        <SignInButton />
      </div>
    </header>
  );
};

export default Header;
