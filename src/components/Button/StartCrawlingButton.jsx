import Button from "../UI/Button";
import PropTypes from "prop-types";

const StartCrawlingButton = ({ isDisabled, onButtonClick }) => {
  return (
    <Button
      styles="flex-center px-8 py-5 border-1 border-gray-500 bg-gray-100 rounded-[1px] text-black text-14 font-medium hover:bg-gray-300 rounded"
      isDisabled={isDisabled}
      onClick={onButtonClick}
    >
      오늘 게시물 불러오기
    </Button>
  );
};

export default StartCrawlingButton;

StartCrawlingButton.propTypes = {
  isDisabled: PropTypes.bool,
  onButtonClick: PropTypes.func,
};
