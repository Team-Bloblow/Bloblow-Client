import Button from "../UI/Button";
import PropTypes from "prop-types";

const Logo = ({ styles, destination }) => {
  return (
    <Button
      destination={destination}
      styles={`font-bold bg-gradient-to-r from-[#00684A] via-[#009F55] via-40% to-[#00ED64] text-transparent bg-clip-text ${styles}`}
    >
      Bloblow
    </Button>
  );
};

export default Logo;

Logo.propTypes = {
  styles: PropTypes.string.isRequired,
  destination: PropTypes.string,
};
