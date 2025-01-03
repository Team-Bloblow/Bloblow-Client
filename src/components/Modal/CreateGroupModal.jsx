import { useState } from "react";

import asyncPostGroup from "../../api/group/asyncPostGroup";
import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import CreateKeywordButton from "../Button/CreateKeywordButton";
import Portal from "../Common/Portal";
import Label from "../UI/Label";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateGroupModal = () => {
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const addModal = useBoundStore((state) => state.addModal);
  const closeModal = useBoundStore((state) => state.closeModal);
  const [inputGroup, setInputGroup] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const createGroupMutation = useMutation({
    mutationFn: (groupInfo) => asyncPostGroup(groupInfo),
  });

  const handleNewGroupInputChange = (e) => {
    setInputGroup(e.target.value);
  };

  const handleGroupSubmit = (e) => {
    e.preventDefault();

    const inputGroupValue = inputGroup.trim();

    if (inputGroupValue === "") {
      setErrorMessage(ERROR_MESSAGE.NEW_GROUP_EMPTY_INPUT_VALUE);
      return;
    } else {
      setErrorMessage("");
    }

    const groupInfo = {
      groupName: inputGroupValue,
      ownerUid: userUid,
    };

    createGroupMutation.mutate(groupInfo, {
      onSuccess: (data) => {
        if (data?.message?.includes("Error occured")) {
          addModal(MODAL_TYPE.ERROR);
          return;
        }

        closeModal(MODAL_TYPE.CREATE_GROUP);
        addModal(MODAL_TYPE.CREATE_GROUP_SUCCESS);
        queryClient.invalidateQueries({ queryKey: ["userGroupList", data.ownerUid] });
      },
      onError: () => {
        addModal(MODAL_TYPE.ERROR);
      },
    });

    return;
  };

  const isPending = createGroupMutation.isPending;

  return (
    <Portal>
      <ModalBackground isClear={true} modalType={MODAL_TYPE.CREATE_GROUP}>
        <ModalFrame isClear={true} hasCloseButton={true} modalType={MODAL_TYPE.CREATE_GROUP}>
          <form
            className="md:w-500 flex-col-center md:gap-15 gap-5 md:mt-45 mt-25"
            onSubmit={handleGroupSubmit}
          >
            <div className="w-full flex flex-col md:flex-row items-start md:gap-20 gap-10">
              <Label
                htmlFor="newGroup"
                styles="md:text-20 text-16 text-slate-700 font-semibold flex-shrink-0"
              >
                새로운 그룹
              </Label>
              <div className="flex flex-col justify-center gap-3 w-full">
                <input
                  type="text"
                  id="newGroup"
                  value={inputGroup}
                  onChange={handleNewGroupInputChange}
                  className="w-full h-40 px-15 border-2 border-black rounded-[5px] text-black font-semibold md:placeholder:text-16 placeholder:text-14"
                  placeholder="새롭게 추가할 그룹명을 입력해주세요"
                />
                <p className="text-12 text-red-500 h-18 font-semibold">{errorMessage}</p>
              </div>
            </div>
            <CreateKeywordButton isDisabled={isPending} />
          </form>
        </ModalFrame>
      </ModalBackground>
    </Portal>
  );
};

export default CreateGroupModal;
