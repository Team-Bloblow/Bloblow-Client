import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const Button = ({ styles, children, type, destination, onClick }) => {
  return (
    <>
      {destination ? (
        <Link to={destination}>
          <button type={type ? type : "button"} className={styles} onClick={onClick}>
            {children}
          </button>
        </Link>
      ) : (
        <button type={type ? type : "button"} className={styles} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;

Button.propTypes = {
  styles: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  destination: PropTypes.string,
  onClick: PropTypes.func,
};
