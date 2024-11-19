import PropTypes from "prop-types";

const Label = ({ htmlFor, children, styles }) => {
  return (
    <label htmlFor={htmlFor} className={styles}>
      {children}
    </label>
  );
};

export default Label;

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node,
  styles: PropTypes.string,
};
