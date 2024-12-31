import { MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import Portal from "../Common/Portal";
import Button from "../UI/Button";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import PropTypes from "prop-types";

const AlertModal = ({ alertMessage, destination }) => {
  const closeModal = useBoundStore((state) => state.closeModal);

  const handleConfirmClick = () => {
    closeModal(MODAL_TYPE.ALERT);
  };

  return (
    <Portal>
      <ModalBackground isClear={false} modalType={MODAL_TYPE.ALERT}>
        <ModalFrame isClear={false} hasCloseButton={false} modalType={MODAL_TYPE.ALERT}>
          <main className="flex flex-col items-center">
            <h1 className="md:text-20 text-16">{alertMessage}</h1>
            {destination ? (
              <Button
                type="button"
                styles="flex-center md:px-14 md:py-6 px-10 py-4 font-medium border-2 border-slate-200 bg-slate-400/90 rounded-[5px] text-white md:text-18 text-14 mt-15"
                destination={destination}
                onClick={handleConfirmClick}
              >
                확인
              </Button>
            ) : (
              <Button
                type="button"
                styles="flex-center md:px-14 md:py-6 px-10 py-4 font-medium border-2 border-slate-200 bg-slate-400/90 rounded-[5px] text-white md:text-18 text-14 mt-15"
                onClick={handleConfirmClick}
              >
                확인
              </Button>
            )}
          </main>
        </ModalFrame>
      </ModalBackground>
    </Portal>
  );
};

export default AlertModal;

AlertModal.propTypes = {
  alertMessage: PropTypes.string.isRequired,
  destination: PropTypes.string,
};
