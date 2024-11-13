import { useState } from "react";
import { useParams } from "react-router-dom";

import asyncEditSubKeyword from "../../api/keyword/asyncEditSubKeyword";
import { ERROR_MESSAGE, GENERAL_TEXT, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import CreateKeywordButton from "../Button/CreateKeywordButton";
import KeywordChip from "../Chip/KeywordChip";
import Portal from "../Common/Portal";
import PlusSquareIcon from "../Icon/PlusSquareIcon";
import Label from "../UI/Label";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditSubKeywordModal = () => {
  const userInfo = useBoundStore((state) => state.userInfo);
  const addModal = useBoundStore((state) => state.addModal);
  const closeModal = useBoundStore((state) => state.closeModal);
  const keywordId = useParams().keywordId;
  const keywordName = "임시 대표 키워드 이름";
  const [inputValue, setInputValue] = useState({
    includedKeyword: "",
    excludedKeyword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    includedKeyword: "",
    excludedKeyword: "",
  });
  const [subKeywordList, setSubKeywordList] = useState({
    includedKeyword: ["추가 키워드1", "추가 키워드2"],
    excludedKeyword: ["제외 키워드1", "제외 키워드2"],
  });
  const queryClient = useQueryClient();

  const editSubKeywordMutation = useMutation({
    mutationFn: ({ subKeywordInfo, keywordId }) => asyncEditSubKeyword(subKeywordInfo, keywordId),
  });
  const handleSubKeywordInputChange = (e, subKeywordType) => {
    setInputValue((prev) => ({ ...prev, [subKeywordType]: e.target.value }));
  };
  const handleCreateSubKeywordButtonClick = (subKeywordType) => {
    if (subKeywordList[subKeywordType].includes(inputValue[subKeywordType])) {
      setErrorMessage((prev) => ({
        ...prev,
        [subKeywordType]: ERROR_MESSAGE.KEYWORD_DUPLICATED_INPUT_VALUE,
      }));
      return;
    }

    setSubKeywordList((prev) => ({
      ...prev,
      [subKeywordType]: [...prev[subKeywordType], inputValue[subKeywordType]],
    }));
    setInputValue((prev) => ({ ...prev, [subKeywordType]: "" }));
    return setErrorMessage((prev) => ({ ...prev, [subKeywordType]: "" }));
  };
  const handleRemoveSubKeywordChipClick = (subKeywordType, subKeywordNameForRemove) => {
    setSubKeywordList((prev) => ({
      ...prev,
      [subKeywordType]: prev[subKeywordType].filter(
        (subKeywordName) => subKeywordName !== subKeywordNameForRemove
      ),
    }));
  };
  const handleSubKeywordSubmit = (e) => {
    e.preventDefault();

    const subKeywordInfo = {
      keywordId,
      includedKeyword: subKeywordList.includedKeyword,
      excludedKeyword: subKeywordList.excludedKeyword,
      ownerUid: userInfo.uid,
    };

    editSubKeywordMutation.mutate(
      { subKeywordInfo, keywordId },
      {
        onSuccess: () => {
          closeModal(MODAL_TYPE.EDIT_SUBKEYWORD);
          addModal(MODAL_TYPE.CREATE_KEYWORD_SUCCESS);
          queryClient.invalidateQueries({ queryKey: ["specificKeyword", keywordId] });
        },
        onError: () => {
          addModal(MODAL_TYPE.ERROR);
        },
      }
    );
  };
  return (
    <Portal>
      <ModalBackground isDataFetching={false} isClear={true} modalType={MODAL_TYPE.EDIT_SUBKEYWORD}>
        <ModalFrame isClear={true} hasCloseButton={true} modalType={MODAL_TYPE.EDIT_SUBKEYWORD}>
          <div className="w-full flex items-start mb-18 gap-20">
            <div className="w-110 text-20 text-violet-900 font-semibold flex-shrink-0">
              대표 키워드:
            </div>
            <div className="flex flex-col justify-start gap-3 w-full">
              <p className="w-full text-20 text-violet-900 font-semibold flex-shrink-0">
                {keywordName}
              </p>
            </div>
          </div>
          <form className="w-600 flex-col-center pt-40 gap-15" onSubmit={handleSubKeywordSubmit}>
            <div className="w-full flex items-start gap-20">
              <Label
                htmlFor="includedKeyword"
                styles="w-110 text-20 text-violet-900 font-semibold flex-shrink-0"
              >
                추가 키워드:
              </Label>
              <div className="flex flex-col justify-start gap-3 w-full">
                <input
                  type="text"
                  id="includedKeyword"
                  value={inputValue.includedKeyword}
                  onChange={(e) => handleSubKeywordInputChange(e, "includedKeyword")}
                  className="w-full h-40 px-15 border-2 border-purple-300 rounded-[8px] text-purple-900 font-semibold"
                  placeholder="추가 키워드로 게시물을 추가로 필터링 할 수 있어요"
                />
                <div className="flex items-center gap-5 w-full">
                  {subKeywordList.includedKeyword.map((subKeywordName) => {
                    return (
                      <KeywordChip
                        key={subKeywordName}
                        keywordName={subKeywordName}
                        hasCloseButton={true}
                        onClick={() =>
                          handleRemoveSubKeywordChipClick("includedKeyword", subKeywordName)
                        }
                      />
                    );
                  })}
                </div>
                <p className="text-12 text-red-500 h-18 font-semibold">
                  {errorMessage.includedKeyword}
                </p>
              </div>
              <PlusSquareIcon
                className="size-40 flex-shrink-0 fill-purple-300 cursor-pointer"
                onClick={() => handleCreateSubKeywordButtonClick("includedKeyword")}
              />
            </div>
            <div className="w-full flex items-start gap-20">
              <Label
                htmlFor="excludedKeyword"
                styles="w-110 text-20 text-violet-900 font-semibold flex-shrink-0"
              >
                제외 키워드:
              </Label>
              <div className="flex flex-col justify-start gap-3 w-full">
                <input
                  type="text"
                  id="excludedKeyword"
                  value={inputValue.excludedKeyword}
                  onChange={(e) => handleSubKeywordInputChange(e, "excludedKeyword")}
                  className="w-full h-40 px-15 border-2 border-purple-300 rounded-[8px] text-purple-900 font-semibold"
                  placeholder="제외할 키워드를 입력해주세요"
                />
                <div className="flex items-center gap-5 w-full">
                  {subKeywordList.excludedKeyword.map((subKeywordName) => {
                    return (
                      <KeywordChip
                        key={subKeywordName}
                        keywordName={subKeywordName}
                        hasCloseButton={true}
                        onClick={() =>
                          handleRemoveSubKeywordChipClick("excludedKeyword", subKeywordName)
                        }
                      />
                    );
                  })}
                </div>
                <p className="text-12 text-red-500 h-18 font-semibold">
                  {errorMessage.excludedKeyword}
                </p>
              </div>
              <PlusSquareIcon
                className="size-40 flex-shrink-0 fill-purple-300 cursor-pointer"
                onClick={() => handleCreateSubKeywordButtonClick("excludedKeyword")}
              />
            </div>
            <CreateKeywordButton buttonText={GENERAL_TEXT.EDIT} />
          </form>
        </ModalFrame>
      </ModalBackground>
    </Portal>
  );
};

export default EditSubKeywordModal;
