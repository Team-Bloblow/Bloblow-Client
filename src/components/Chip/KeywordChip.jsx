import CloseIcon from "../Icon/CloseIcon";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const KeywordChip = ({ keywordName, styles, hasCloseButton, handleCloseIconClick }) => {
  return (
    <span className={styles}>
      {keywordName}
      <div>
        {hasCloseButton && (
          <Button styles="right-17" onClick={handleCloseIconClick}>
            <CloseIcon className="size-25" />
          </Button>
        )}
      </div>
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
  styles: PropTypes.string.isRequired,
  hasCloseButton: PropTypes.bool,
  handleCloseIconClick: PropTypes.func,
};
