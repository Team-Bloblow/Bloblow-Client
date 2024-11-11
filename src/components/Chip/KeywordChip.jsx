import PropTypes from "prop-types";

const KeywordChip = ({ keywordName, styles }) => {
  return <span className={styles}>{keywordName}</span>;
};

export default KeywordChip;

KeywordChip.propTypes = {
  keywordName: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
};
