import Button from "../UI/Button";
import PropTypes from "prop-types";

const CreateKeywordButton = ({ isDisabled }) => {
  return (
    <Button
      type="submit"
      styles="flex-center md:px-14 px-10 md:py-6 py-4 font-medium border-2 border-slate-700 bg-white rounded-[5px] text-slate-700 md:text-18 text-15 hover:bg-emerald-200/10"
      isDisabled={isDisabled}
    >
      생성하기
    </Button>
  );
};

export default CreateKeywordButton;

CreateKeywordButton.propTypes = {
  isDisabled: PropTypes.bool,
};
