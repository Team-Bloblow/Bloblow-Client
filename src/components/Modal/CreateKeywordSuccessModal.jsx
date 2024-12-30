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
            <div className="flex flex-col items-center gap-7">
              <h1 className="text-18 mb-10">키워드 등록에 성공하였습니다.</h1>
              <span className="text-gray-600">
                게시물 수집 및 분석 까지 최대 <b className="text-[#03ae5d] ">24</b>시간이 소요될 수
                있어요.
              </span>
            </div>
            <Button
              type="button"
              styles="flex-center mt-10 px-14 py-6 font-medium border-2 border-slate-700 rounded-[5px] text-14 hover:bg-green-500/10"
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
