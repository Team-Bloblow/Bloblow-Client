import { useParams } from "react-router-dom";

import { MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import Portal from "../Common/Portal";
import Button from "../UI/Button";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import PropTypes from "prop-types";

const AlertModal = ({ alertMessage }) => {
  const { groupId } = useParams();
  const closeModal = useBoundStore((state) => state.closeModal);

  const handleConfirmClick = () => {
    closeModal(MODAL_TYPE.ALERT);
  };

  return (
    <Portal>
      <ModalBackground isClear={false} modalType={MODAL_TYPE.ALERT}>
        <ModalFrame isClear={false} hasCloseButton={false} modalType={MODAL_TYPE.ALERT}>
          <main className="flex flex-col gap-10 items-center">
            <h1 className="text-20">{alertMessage}</h1>
            <Button
              type="button"
              styles="flex-center px-14 py-8 font-medium border-2 border-slate-200 bg-slate-400/90 rounded-[5px] text-white text-18 mt-15"
              destination={`/dashboard/${groupId}`}
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

export default AlertModal;

AlertModal.propTypes = {
  alertMessage: PropTypes.string.isRequired,
};
