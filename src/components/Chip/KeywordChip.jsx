import CloseIcon from "../Icon/CloseIcon";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const KeywordChip = ({ keywordName, hasCloseButton, handleCloseIconClick }) => {
  return (
    <span className="flex-center text-14 px-3 py-2 bg-orange-200 rounded-[3px]">
      {keywordName}
      <div>
        {hasCloseButton && (
          <Button styles="right-17" onClick={handleCloseIconClick}>
            <CloseIcon className="size-25" />
          </Button>
        )}
      </div>
    </span>
  );
};

export default KeywordChip;

KeywordChip.propTypes = {
  keywordName: PropTypes.string.isRequired,
  hasCloseButton: PropTypes.bool,
  handleCloseIconClick: PropTypes.func,
};
