import { useLocation } from "react-router-dom";

import Button from "../UI/Button";
import PropTypes from "prop-types";

const Logo = ({ styles, type, destination }) => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <Button
      destination={destination}
      styles={`font-bold bg-gradient-to-r from-[#9996EF] to-[#F9C7D4] text-transparent bg-clip-text ${styles}`}
    >
      {pathName === "/" && type === "nav" ? "Welcome" : "Bloblow"}
    </Button>
  );
};

export default Logo;

Logo.propTypes = {
  styles: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  destination: PropTypes.string,
};
