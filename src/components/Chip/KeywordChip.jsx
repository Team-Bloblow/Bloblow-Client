import CloseIcon from "../Icon/CloseIcon";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const KeywordChip = ({ keywordName, styles, hasCloseButton, onClick }) => {
  return (
    <span className={styles}>
      {keywordName}
      {hasCloseButton && (
        <Button styles="right-17" onClick={onClick}>
          <CloseIcon className="size-25" />
        </Button>
      )}
    </span>
  );
};

export default KeywordChip;

KeywordChip.propTypes = {
  keywordName: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
  hasCloseButton: PropTypes.bool,
  onClick: PropTypes.func,
};
