import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const Button = ({ styles, children, destination, onClick }) => {
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
  styles: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  destination: PropTypes.string,
  onClick: PropTypes.func,
};
