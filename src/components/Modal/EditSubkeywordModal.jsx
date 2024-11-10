import { useState } from "react";
import { useParams } from "react-router-dom";

import asyncEditSubkeyword from "../../api/keyword/asyncEditSubkeyword";
import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import CreateKeywordButton from "../Button/CreateKeywordButton";
import KeywordChip from "../Chip/KeywordChip";
import Portal from "../Common/Portal";
import PlusIcon from "../Icon/PlusIcon";
import Label from "../UI/Label";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditSubkeywordModal = () => {
  const modalNode = document.getElementById("modal");
  const userInfo = useBoundStore((state) => state.userInfo);
  const userGroupList = useBoundStore((state) => state.userGroupList);
  const { name: keywordName } = userGroupList.items.filter((el) => el._id === keywordId);
  const { keywordId } = useParams();
  const [inputValue, setInputValue] = useState({
    includedKeyword: "",
    excludedKeyword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    includedKeyword: "",
    excludedKeyword: "",
  });
  const [subkeywordList, setSubkeywordList] = useState({
    includedKeyword: ["추가 키워드1", "추가 키워드2"],
    excludedKeyword: ["제외 키워드1", "제외 키워드2"],
  });
  const addModal = useBoundStore((state) => state.addModal);
  const closeModal = useBoundStore((state) => state.closeModal);
  const queryClient = useQueryClient();

  const editSubkeywordMutation = useMutation({
    mutationFn: (subkeywordInfo, keywordId) => asyncEditSubkeyword(subkeywordInfo, keywordId),
  });

  const handleIncludedKeywordInputChange = (e) => {
    setInputValue((prev) => ({ ...prev, includedKeyword: e.target.value }));
  };

  const handleExcludedKeywordInputChange = (e) => {
    setInputValue((prev) => ({ ...prev, excludedKeyword: e.target.value }));
  };

  const handleCreateIncludedKeywordButtonClick = () => {
    if (subkeywordList.includedKeyword.includes(inputValue.includedKeyword)) {
      return setErrorMessage((prev) => ({
        ...prev,
        includedKeyword: ERROR_MESSAGE.KEYWORD_DUPLICATED_INPUT_VALUE,
      }));
    }

    setSubkeywordList((prev) => ({
      ...prev,
      includedKeyword: [...prev.includedKeyword, inputValue.includedKeyword],
    }));
    setInputValue((prev) => ({ ...prev, includedKeyword: "" }));
    return setErrorMessage((prev) => ({ ...prev, includedKeyword: "" }));
  };
  const handleCreateExcludedKeywordButtonClick = () => {
    if (subkeywordList.excludedKeyword.includes(inputValue.excludedKeyword)) {
      return setErrorMessage((prev) => ({
        ...prev,
        excludedKeyword: ERROR_MESSAGE.KEYWORD_DUPLICATED_INPUT_VALUE,
      }));
    }

    setSubkeywordList((prev) => ({
      ...prev,
      excludedKeyword: [...prev.excludedKeyword, inputValue.excludedKeyword],
    }));
    setInputValue((prev) => ({ ...prev, excludedKeyword: "" }));
    return setErrorMessage((prev) => ({ ...prev, excludedKeyword: "" }));
  };

  const handleSubKeywordSubmit = (e) => {
    e.preventDefault();

    const subkeywordInfo = {
      keywordId,
      includedKeyword: subkeywordList.includedKeyword,
      excludedKeyword: subkeywordList.excludedKeyword,
      ownerUid: userInfo.id,
    };

    editSubkeywordMutation.mutate(subkeywordInfo, {
      onSuccess: (data) => {
        closeModal(MODAL_TYPE.EDIT_SUBKEYWORD);
        addModal(MODAL_TYPE.CREATE_KEYWORD_SUCCESS);
        queryClient.invalidateQueries({ queryKey: ["userGroupList"] });
      },
      onError: () => {
        addModal(MODAL_TYPE.ERROR);
      },
    });
  };
  console.log("1", subkeywordList);
  console.log("2", subkeywordList.includedKeyword);
  return (
    <Portal mountDomNode={modalNode}>
      <ModalBackground modalType={MODAL_TYPE.EDIT_SUBKEYWORD}>
        <ModalFrame modalType={MODAL_TYPE.EDIT_SUBKEYWORD}>
          <div className="w-full flex items-start mb-18 gap-20">
            <div className="w-110 text-20 text-violet-900 font-semibold flex-shrink-0">
              대표 키워드:
            </div>
            <div className="flex flex-col justify-start gap-3 w-full">
              <div className="w-full h-40 px-15 border-2 border-purple-300 rounded-[8px] text-purple-900 font-semibold">
                <p className="w-110 text-20 text-violet-900 font-semibold flex-shrink-0">
                  {keywordName}
                </p>
              </div>
            </div>
          </div>
          <form className="w-600 flex-col-center pt-40 gap-15" onSubmit={handleSubKeywordSubmit}>
            <div className="w-full flex items-start gap-20">
              <Label
                htmlFor="includedKeyword"
                styles="w-110 text-20 text-violet-900 font-semibold flex-shrink-0"
              >
                추가 Keyword:
              </Label>
              <div className="flex flex-col justify-start gap-3 w-full">
                <input
                  type="text"
                  id="includedKeyword"
                  value={inputValue.includedKeyword}
                  onChange={handleIncludedKeywordInputChange}
                  className="w-full h-40 px-15 border-2 border-purple-300 rounded-[8px] text-purple-900 font-semibold"
                  placeholder="새롭게 추가할 키워드를 입력해주세요"
                />
                <div>
                  {subkeywordList.includedKeyword.map((el) => {
                    return <KeywordChip key={el} keywordName={el} />;
                  })}
                </div>
                <p className="text-12 text-red-500 h-18 font-semibold">
                  {errorMessage.includedKeyword}
                </p>
              </div>
              <PlusIcon
                className="size-40 flex-shrink-0 fill-purple-300 cursor-pointer"
                onClick={handleCreateIncludedKeywordButtonClick}
              />
            </div>
            <div className="w-full flex items-start gap-20">
              <Label
                htmlFor="excludedKeyword"
                styles="w-110 text-20 text-violet-900 font-semibold flex-shrink-0"
              >
                제외 Keyword:
              </Label>
              <div className="flex flex-col justify-start gap-3 w-full">
                <input
                  type="text"
                  id="excludedKeyword"
                  value={inputValue.excludedKeyword}
                  onChange={handleExcludedKeywordInputChange}
                  className="w-full h-40 px-15 border-2 border-purple-300 rounded-[8px] text-purple-900 font-semibold"
                  placeholder="제외할 키워드를 입력해주세요"
                />
                <div>
                  {subkeywordList.excludedKeyword.map((el) => {
                    return <KeywordChip key={el} keywordName={el} />;
                  })}
                </div>
                <p className="text-12 text-red-500 h-18 font-semibold">
                  {errorMessage.excludedKeyword}
                </p>
              </div>
              <PlusIcon
                className="size-40 flex-shrink-0 fill-purple-300 cursor-pointer"
                onClick={handleCreateExcludedKeywordButtonClick}
              />
            </div>
            <CreateKeywordButton buttonText={"저장하기"} />
          </form>
        </ModalFrame>
      </ModalBackground>
    </Portal>
  );
};

export default EditSubkeywordModal;
