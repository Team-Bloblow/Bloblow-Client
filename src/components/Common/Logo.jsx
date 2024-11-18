import Button from "../UI/Button";
import PropTypes from "prop-types";

const Logo = ({ styles, destination }) => {
  return (
    <Button destination={destination} styles={styles}>
      <img src="../public/assets/logo-bloblow.png" alt="logo-bloblow"></img>
    </Button>
  );
};

export default Logo;

Logo.propTypes = {
  styles: PropTypes.string.isRequired,
  destination: PropTypes.string,
};
