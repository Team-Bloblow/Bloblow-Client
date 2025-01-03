import { useState } from "react";

import asyncPostKeyword from "../../api/keyword/asyncPostKeyword";
import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import CreateKeywordButton from "../Button/CreateKeywordButton";
import Portal from "../Common/Portal";
import SelectGroupDropDown from "../DropDown/SelectGroupDropDown";
import LightIcon from "../Icon/LightIcon";
import PlusSquareIcon from "../Icon/PlusSquareIcon";
import Label from "../UI/Label";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

const CreateKeywordModal = ({ createType, selectedGroupId, selectedGroupName }) => {
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const addModal = useBoundStore((state) => state.addModal);
  const closeModal = useBoundStore((state) => state.closeModal);
  const userGroupList = useBoundStore((state) => state.userGroupList);

  const [isCreatingNewGroup, setIsCreatingNewGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({
    id: createType === MODAL_TYPE.CREATE_KEYWORD.DASHBOARD ? selectedGroupId : "",
    name: createType === MODAL_TYPE.CREATE_KEYWORD.DASHBOARD ? selectedGroupName : "",
  });
  const [inputValue, setInputValue] = useState({
    newGroup: "",
    keyword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    group: "",
    newGroup: "",
    keyword: "",
  });
  const groupList = userGroupList.map((group) => {
    return { id: group._id, name: group.name };
  });

  const isNewGroupSelected = selectedGroup.id === "" && selectedGroup.name !== "";

  const queryClient = useQueryClient();

  const createKeywordMutation = useMutation({
    mutationFn: (keywordInfo) => asyncPostKeyword(keywordInfo),
  });

  const handleCreateNewGroupButtonClick = () => {
    setIsCreatingNewGroup(true);
  };

  const handleNewGroupInputChange = (e) => {
    setInputValue((prev) => ({ ...prev, newGroup: e.target.value }));
  };

  const handleKeywordInputChange = (e) => {
    setInputValue((prev) => ({ ...prev, keyword: e.target.value }));
  };

  const handleKeywordSubmit = (e) => {
    e.preventDefault();

    const keywordValue = inputValue.keyword.trim();
    const newGroupValue = inputValue.newGroup.trim();

    if (isCreatingNewGroup) {
      if (newGroupValue === "") {
        setErrorMessage((prev) => ({
          ...prev,
          newGroup: ERROR_MESSAGE.NEW_GROUP_EMPTY_INPUT_VALUE,
        }));
        return;
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          newGroup: "",
        }));
      }
    } else {
      if (selectedGroup.name === "") {
        setErrorMessage((prev) => ({ ...prev, group: ERROR_MESSAGE.MUST_GROUP_SELECT }));
        return;
      } else {
        setErrorMessage((prev) => ({ ...prev, group: "" }));
      }
    }

    if (keywordValue === "") {
      setErrorMessage((prev) => ({
        ...prev,
        keyword: ERROR_MESSAGE.KEYWORD_EMPTY_INPUT_VALUE,
      }));
      return;
    } else if (keywordValue.length >= 15) {
      setErrorMessage((prev) => ({
        ...prev,
        keyword: ERROR_MESSAGE.KEYWORD_EMPTY_INPUT_VALUE_LONG,
      }));
      return;
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        keyword: "",
      }));
    }

    const keywordInfo = {
      groupId: isCreatingNewGroup ? "" : selectedGroup.id,
      keyword: keywordValue,
      ownerUid: userUid,
    };

    createKeywordMutation.mutate(keywordInfo, {
      onSuccess: (data) => {
        if (data?.message?.includes("Error occured")) {
          addModal(MODAL_TYPE.ERROR);
          return;
        }

        closeModal(MODAL_TYPE.CREATE_KEYWORD);
        addModal(MODAL_TYPE.CREATE_KEYWORD_SUCCESS);
        queryClient.invalidateQueries({ queryKey: ["userGroupList", data.ownerUid] });
      },
      onError: () => {
        addModal(MODAL_TYPE.ERROR);
      },
    });
  };

  const isPending = createKeywordMutation.isPending;

  return (
    <Portal>
      <ModalBackground
        isDataFetching={isPending}
        isClear={true}
        modalType={MODAL_TYPE.CREATE_KEYWORD.DEFAULT}
      >
        <ModalFrame
          isClear={true}
          hasCloseButton={isPending ? false : true}
          modalType={MODAL_TYPE.CREATE_KEYWORD.DEFAULT}
        >
          <form
            className={`md:w-500 flex-col-center ${isPending || "pt-40"} md:gap-15 gap-5`}
            onSubmit={handleKeywordSubmit}
          >
            {isCreatingNewGroup ? (
              <div className="w-full flex items-start gap-20">
                <Label
                  htmlFor="newGroup"
                  styles="w-100 text-20 text-slate-700 font-semibold flex-shrink-0"
                >
                  새로운 그룹
                </Label>
                <div className="flex flex-col justify-center gap-3 w-full">
                  <input
                    type="text"
                    id="newGroup"
                    value={inputValue.newGroup}
                    onChange={handleNewGroupInputChange}
                    className="w-full h-40 px-15 border-2 border-black rounded-[5px] text-black font-semibold"
                    placeholder="새롭게 추가할 그룹명을 입력해주세요"
                  />
                  <p className="text-12 text-red-500 h-18 font-semibold">{errorMessage.newGroup}</p>
                </div>
              </div>
            ) : (
              <div className="w-full flex items-start md:gap-20 gap-10">
                <Label
                  htmlFor="group"
                  styles="md:w-100 w-45 md:text-20 text-16 text-slate-700 font-semibold flex-shrink-0"
                >
                  그룹
                </Label>
                {createType === "dashboard" ? (
                  <p className="w-full h-40 md:text-18 text-16 text-slate-700 font-semibold">
                    {selectedGroup.name}
                  </p>
                ) : (
                  <>
                    <div className="flex flex-col justify-center gap-3 w-full">
                      <SelectGroupDropDown
                        selectedGroup={selectedGroup}
                        groupList={groupList}
                        setSelectedGroup={setSelectedGroup}
                      />
                      <p className="text-12 text-red-500 h-18 font-semibold">
                        {errorMessage.group}
                      </p>
                    </div>
                    {!isNewGroupSelected && (
                      <PlusSquareIcon
                        className="size-40 flex-shrink-0 fill-black cursor-pointer hover:fill-emerald-950"
                        onClick={handleCreateNewGroupButtonClick}
                      />
                    )}
                  </>
                )}
              </div>
            )}
            <div className="w-full flex items-start md:gap-20 gap-10">
              <Label
                htmlFor="keyword"
                styles="md:w-100 w-45 md:text-20 text-16 text-slate-700 font-semibold flex-shrink-0"
              >
                키워드
              </Label>
              <div className="flex flex-col justify-start gap-3 w-full">
                <input
                  type="text"
                  id="keyword"
                  value={inputValue.keyword}
                  onChange={handleKeywordInputChange}
                  className="w-full h-40 px-15 border-2 border-slate-700 rounded-[5px] text-black font-semibold md:placeholder:text-16 placeholder:text-14 md:text-16 text-14"
                  placeholder="새롭게 추가할 키워드를 입력해주세요"
                />
                <p className="text-12 text-red-500 h-18 font-semibold">{errorMessage.keyword}</p>
              </div>
            </div>
            <div className="relative w-full p-12 mb-5 flex justify-center items-center bg-gray-100 rounded">
              <div className="absolute left-25">
                <LightIcon />
              </div>
              <span className="text-14 text-gray-500 text-center">
                키워드는 네이버 블로그 게시물을 불러올 때 검색어로 활용돼요.
                <br />
                구체적인 키워드는 게시물 검색 결과의 정확도를 높일 수 있어요.
                <br />
                띄어쓰기에 따라 검색 결과가 다를 수 있어요. (예 : 카페라떼, 카페 라떼)
              </span>
            </div>
            <CreateKeywordButton isDisabled={isPending} />
          </form>
        </ModalFrame>
      </ModalBackground>
    </Portal>
  );
};

export default CreateKeywordModal;

CreateKeywordModal.propTypes = {
  createType: PropTypes.string.isRequired,
  selectedGroupId: PropTypes.string,
  selectedGroupName: PropTypes.string,
};
