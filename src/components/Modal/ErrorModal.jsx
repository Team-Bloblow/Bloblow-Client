import { MODAL_TYPE } from "../../config/const";
import useBoundStore from "../../store/client/useBoundStore";
import Portal from "../Common/Portal";
import Button from "../UI/Button";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import PropTypes from "prop-types";

const ErrorModal = ({ errorMessage }) => {
  const closeModal = useBoundStore((state) => state.closeModal);

  const handleConfirmClick = () => {
    closeModal(MODAL_TYPE.ERROR);
  };

  return (
    <Portal>
      <ModalBackground isClear={false} modalType={MODAL_TYPE.ERROR}>
        <ModalFrame isClear={false} isExistCloseButton={false} modalType={MODAL_TYPE.ERROR}>
          <main className="flex flex-col gap-10 items-center">
            <h1 className="text-16 text-red-400">{errorMessage} 😅</h1>
            <Button
              type="button"
              styles="flex-center px-14 py-8 font-medium border-2 border-purple-200 bg-purple-400/80 rounded-[15px] text-white text-18 hover:bg-purple-500/80"
              onClick={handleConfirmClick}
            >
              확인
            </Button>
          </main>
        </ModalFrame>
      </ModalBackground>
    </Portal>
  );
};

export default ErrorModal;

ErrorModal.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
