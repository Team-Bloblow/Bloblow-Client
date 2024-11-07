import { MODAL_TYPE } from "../../config/const";
import useBoundStore from "../../store/client/useBoundStore";
import Portal from "../Common/Portal";
import Button from "../UI/Button";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";

const CreateKeywordSuccessModal = () => {
  const clearModal = useBoundStore((state) => state.clearModal);
  const modalNode = document.getElementById("modal");

  const handleConfirmClick = () => {
    clearModal();
  };

  return (
    <Portal mountDomNode={modalNode}>
      <ModalBackground isClear={true} modalType={MODAL_TYPE.CREATE_KEYWORD_SUCCESS}>
        <ModalFrame
          isClear={true}
          isExistCloseButton={false}
          modalType={MODAL_TYPE.CREATE_KEYWORD_SUCCESS}
        >
          <main className="flex flex-col gap-10 items-center">
            <h1 className="text-">키워드 등록에 성공하였습니다 🎉</h1>
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

export default CreateKeywordSuccessModal;
