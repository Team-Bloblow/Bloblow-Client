import asyncDeleteKeyword from "../../api/keyword/asyncDeleteKeyword";
import { CONFIRM_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import Portal from "../Common/Portal";
import Button from "../UI/Button";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

const ConfirmModal = ({ confirmMessage, confirmData }) => {
  const addModal = useBoundStore((state) => state.addModal);
  const closeModal = useBoundStore((state) => state.closeModal);

  const queryClient = useQueryClient();

  const deleteKeywordMutation = useMutation({
    mutationFn: (keywordId) => asyncDeleteKeyword(keywordId),
  });

  const handleCancelClick = () => {
    closeModal(MODAL_TYPE.CONFIRM);
  };

  const handleConfirmClick = async () => {
    if (confirmMessage === CONFIRM_MESSAGE.DELETE_KEYWORD) {
      const keywordId = confirmData?.keywordId;
      deleteKeywordMutation.mutate(keywordId, {
        onSuccess: (data) => {
          if (data.status !== "ok") {
            closeModal(MODAL_TYPE.CONFIRM);
            addModal(MODAL_TYPE.ERROR);
            return;
          }

          closeModal(MODAL_TYPE.CONFIRM);
          addModal(MODAL_TYPE.ALERT);
          queryClient.invalidateQueries({ queryKey: ["userGroupList", data.ownerUid] });
        },
        onError: () => {
          addModal(MODAL_TYPE.ERROR);
        },
      });
    }
  };

  return (
    <Portal>
      <ModalBackground isClear={false} modalType={MODAL_TYPE.CONFIRM}>
        <ModalFrame isClear={false} hasCloseButton={false} modalType={MODAL_TYPE.CONFIRM}>
          <main className="flex flex-col gap-10 items-center">
            <h1 className="text-20">{confirmMessage}</h1>
            <p className="flex flex-row gap-15 mt-15">
              <Button
                type="button"
                styles="flex-center px-14 py-8 font-medium border-2 border-slate-200 bg-white rounded-[5px] text-slate-900 text-18"
                onClick={handleCancelClick}
              >
                취소
              </Button>
              <Button
                type="button"
                styles="flex-center px-14 py-8 font-medium border-2 border-slate-200 bg-slate-400/90 rounded-[5px] text-white text-18"
                onClick={handleConfirmClick}
              >
                확인
              </Button>
            </p>
          </main>
        </ModalFrame>
      </ModalBackground>
    </Portal>
  );
};

export default ConfirmModal;

ConfirmModal.propTypes = {
  confirmMessage: PropTypes.string.isRequired,
  confirmData: PropTypes.object,
};
