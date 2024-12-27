import { MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import Portal from "../Common/Portal";
import Button from "../UI/Button";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";

const CreateKeywordSuccessModal = () => {
  const clearOpenModalTypeList = useBoundStore((state) => state.clearOpenModalTypeList);

  const handleConfirmClick = () => {
    clearOpenModalTypeList();
  };

  return (
    <Portal>
      <ModalBackground isClear={true} modalType={MODAL_TYPE.CREATE_KEYWORD_SUCCESS}>
        <ModalFrame
          isClear={true}
          hasCloseButton={false}
          modalType={MODAL_TYPE.CREATE_KEYWORD_SUCCESS}
        >
          <main className="flex flex-col gap-15 items-center">
            <div className="flex flex-col items-center gap-5">
              <h1 className="text-18">키워드 등록에 성공하였습니다.</h1>
              <span>게시물 수집, 분석 까지 최대 24시간이 소요될 수 있어요.</span>
            </div>
            <Button
              type="button"
              styles="flex-center px-14 py-6 font-medium border-2 border-slate-700 bg-green-500/10 rounded-[5px] text-14 hover:bg-green-500/20"
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
