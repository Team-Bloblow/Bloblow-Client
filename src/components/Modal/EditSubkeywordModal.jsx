import { useState } from "react";
import { useParams } from "react-router-dom";

import asyncEditSubkeyword from "../../api/keyword/asyncEditSubkeyword";
import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import CreateKeywordButton from "../Button/CreateKeywordButton";
import KeywordChip from "../Chip/KeywordChip";
import Portal from "../Common/Portal";
import PlusSquareIcon from "../Icon/PlusSquareIcon";
import Label from "../UI/Label";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditSubkeywordModal = () => {
  const modalNode = document.getElementById("modal");
  const userInfo = useBoundStore((state) => state.userInfo);
  const { keywordId } = useParams();
  const keywordName = "임시 대표 키워드 이름";
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
  const handleSubkeywordInputChange = (e, subkeywordType) => {
    setInputValue((prev) => ({ ...prev, [subkeywordType]: e.target.value }));
  };
  const handleCreateSubeywordButtonClick = (subkeywordType) => {
    if (subkeywordList[subkeywordType].includes(inputValue[subkeywordType])) {
      return setErrorMessage((prev) => ({
        ...prev,
        [subkeywordType]: ERROR_MESSAGE.KEYWORD_DUPLICATED_INPUT_VALUE,
      }));
    }

    setSubkeywordList((prev) => ({
      ...prev,
      [subkeywordType]: [...prev[subkeywordType], inputValue[subkeywordType]],
    }));
    setInputValue((prev) => ({ ...prev, [subkeywordType]: "" }));
    return setErrorMessage((prev) => ({ ...prev, [subkeywordType]: "" }));
  };
  const removeSubkeyword = (subkeywordType, subkeywordNameForRemove) => {
    setSubkeywordList((prev) => ({
      ...prev,
      [subkeywordType]: prev[subkeywordType].filter(
        (subkeywordName) => subkeywordName !== subkeywordNameForRemove
      ),
    }));
  };
  const handleSubKeywordSubmit = (e) => {
    e.preventDefault();

    const subkeywordInfo = {
      keywordId,
      includedKeyword: subkeywordList.includedKeyword,
      excludedKeyword: subkeywordList.excludedKeyword,
      ownerUid: userInfo.id,
    };

    editSubkeywordMutation.mutate(
      { subkeywordInfo, keywordId },
      {
        onSuccess: () => {
          closeModal(MODAL_TYPE.EDIT_SUBKEYWORD);
          addModal(MODAL_TYPE.CREATE_KEYWORD_SUCCESS);
          queryClient.invalidateQueries({ queryKey: ["userGroupList"] });
        },
        onError: () => {
          addModal(MODAL_TYPE.ERROR);
        },
      }
    );
  };
  return (
    <Portal mountDomNode={modalNode}>
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
                  onChange={(e) => handleSubkeywordInputChange(e, "includedKeyword")}
                  className="w-full h-40 px-15 border-2 border-purple-300 rounded-[8px] text-purple-900 font-semibold"
                  placeholder="새롭게 추가할 키워드를 입력해주세요"
                />
                <div className="flex items-center gap-5 w-full">
                  {subkeywordList.includedKeyword.map((subkeywordName) => {
                    return (
                      <KeywordChip
                        key={subkeywordName}
                        keywordName={subkeywordName}
                        hasCloseButton={true}
                        handleCloseIconClick={() =>
                          removeSubkeyword("includedKeyword", subkeywordName)
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
                onClick={() => handleCreateSubeywordButtonClick("includedKeyword")}
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
                  onChange={(e) => handleSubkeywordInputChange(e, "excludedKeyword")}
                  className="w-full h-40 px-15 border-2 border-purple-300 rounded-[8px] text-purple-900 font-semibold"
                  placeholder="제외할 키워드를 입력해주세요"
                />
                <div className="flex items-center gap-5 w-full">
                  {subkeywordList.excludedKeyword.map((subkeywordName) => {
                    return (
                      <KeywordChip
                        key={subkeywordName}
                        keywordName={subkeywordName}
                        hasCloseButton={true}
                        handleCloseIconClick={() =>
                          removeSubkeyword("excludedKeyword", subkeywordName)
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
                onClick={() => handleCreateSubeywordButtonClick("excludedKeyword")}
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
