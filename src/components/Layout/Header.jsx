import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav>
      <button></button>
    </nav>
  );
};

export default Header;
