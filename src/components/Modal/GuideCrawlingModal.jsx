import { MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import Portal from "../Common/Portal";
import Button from "../UI/Button";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";

const GuideCrawlingModal = () => {
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
            <div className="flex flex-col text-center gap-5">
              <h1 className="font-semibold md:text-22 text-15 mb-5">게시물을 분석하고 있습니다.</h1>
              <span className="md:text-20 text-12">
                게시물 수에 따라 최대 10분 소요될 수 있어요.
              </span>
              <span className="md:text-20 text-12">잠시만 기다려주세요.</span>
            </div>
            <Button
              type="button"
              styles="flex-center md:px-14 md:py-6 px-10 py-4 font-medium border-2 border-slate-200 bg-slate-400/90 rounded-[5px] text-white md:text-18 text-14 mt-15"
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

export default GuideCrawlingModal;
