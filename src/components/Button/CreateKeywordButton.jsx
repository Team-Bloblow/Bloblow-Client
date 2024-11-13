import Button from "../UI/Button";
import PropTypes from "prop-types";

const CreateKeywordButton = ({ isDisabled }) => {
  return (
    <Button
      type="submit"
      styles="flex-center px-14 py-6 font-medium border-2 border-slate-700 bg-white rounded-[5px] text-slate-700 text-18 hover:bg-slate-100/50"
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
