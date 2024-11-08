import PropTypes from "prop-types";

const KeywordChip = ({ keywordName }) => {
  return (
    <span className="flex-center text-14 px-3 py-2 bg-orange-200 rounded-[3px]">{keywordName}</span>
  );
};

export default KeywordChip;

KeywordChip.propTypes = {
  keywordName: PropTypes.string.isRequired,
};
