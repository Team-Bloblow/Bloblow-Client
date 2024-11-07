import Button from "../UI/Button";
import PropTypes from "prop-types";

const CreateKeywordButton = ({ disabled }) => {
  return (
    <Button
      type="submit"
      styles="flex-center px-14 py-8 font-medium border-2 border-purple-200 bg-purple-400/80 rounded-[15px] text-white text-18 hover:bg-purple-500/80"
      disabled={disabled}
    >
      생성하기
    </Button>
  );
};

export default CreateKeywordButton;

CreateKeywordButton.propTypes = {
  disabled: PropTypes.bool,
};
