import Button from "../UI/Button";
import PropTypes from "prop-types";

const StartCrawlingButton = ({ isDisabled, onButtonClick }) => {
  return (
    <Button
      styles="flex-center px-8 py-4 border-1 border-slate-200 bg-white rounded-[1px] text-black text-11 hover:bg-gray-200/30"
      isDisabled={isDisabled}
      onClick={onButtonClick}
    >
      오늘의 게시물 분석하기
    </Button>
  );
};

export default StartCrawlingButton;

StartCrawlingButton.propTypes = {
  isDisabled: PropTypes.bool,
  onButtonClick: PropTypes.func,
};
