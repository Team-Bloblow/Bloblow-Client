import { MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import Portal from "../Common/Portal";
import Button from "../UI/Button";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import PropTypes from "prop-types";

const GuideCrawlingModal = ({ alertTitle, alertBody, destination }) => {
  const closeModal = useBoundStore((state) => state.closeModal);

  const handleConfirmClick = () => {
    closeModal(MODAL_TYPE.IS_CRAWLING_IN_PROGRESS);
  };

  return (
    <Portal>
      <ModalBackground isClear={false} modalType={MODAL_TYPE.IS_CRAWLING_IN_PROGRESS}>
        <ModalFrame
          isClear={false}
          hasCloseButton={false}
          modalType={MODAL_TYPE.IS_CRAWLING_IN_PROGRESS}
        >
          <main className="flex flex-col items-center">
            <div className="flex flex-col text-center gap-10">
              <h1 className="font-semibold md:text-22 text-18">{alertTitle}</h1>
              <span className="md:text-20 text-16">{alertBody}</span>
            </div>
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

export default GuideCrawlingModal;

GuideCrawlingModal.propTypes = {
  alertTitle: PropTypes.string.isRequired,
  alertBody: PropTypes.string,
  destination: PropTypes.string,
};
