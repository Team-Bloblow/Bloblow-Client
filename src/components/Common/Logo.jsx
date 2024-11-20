import { SIGNATURE_COLOR } from "../../config/constants";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const Logo = ({ styles, destination }) => {
  return (
    <Button
      destination={destination}
      styles={`font-bold bg-gradient-to-r from-[${SIGNATURE_COLOR.START}] via-[${SIGNATURE_COLOR.VIA}] via-40% to-[${SIGNATURE_COLOR.TO}] text-transparent bg-clip-text ${styles}`}
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
