import { MODAL_TYPE } from "../../config/constants";
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
        <ModalFrame isClear={false} hasCloseButton={false} modalType={MODAL_TYPE.ERROR}>
          <main className="flex flex-col gap-15 items-center">
            <h1 className="text-18 text-red-700">{errorMessage}</h1>
            <Button
              type="button"
              styles="flex-center px-14 py-6 font-medium border-2 border-slate-700 bg-red-500/10 rounded-[5px] text-14 hover:bg-red-500/20"
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
