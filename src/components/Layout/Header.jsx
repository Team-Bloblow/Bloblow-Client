import SignInButton from "../Button/SignInButton";

const Header = () => {
  return (
    <nav className="flex-center fixed top-0 z-header w-full border-b-1 bg-white shadow-sm">
      <div className="mt-2 flex h-64 w-full max-w-1150 items-center justify-between px-20">
        <SignInButton />
      </div>
    </nav>
  );
};

export default Header;
