import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const Button = ({ destination, styles, children, onClick }) => {
  return (
    <>
      {destination ? (
        <Link to={destination}>
          <button className={styles} onClick={onClick}>
            {children}
          </button>
        </Link>
      ) : (
        <button className={styles} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;

Button.propTypes = {
  destination: PropTypes.string,
  styles: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
