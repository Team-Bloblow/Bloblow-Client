import PropTypes from "prop-types";

const KeywordChip = ({ keywordName }) => {
  return (
    <span className="flex-center text-14 px-5 py-2 bg-orange-100 text-rose-800 rounded-[3px]">
      {keywordName}
    </span>
  );
};

export default KeywordChip;

KeywordChip.propTypes = {
  keywordName: PropTypes.string.isRequired,
};
