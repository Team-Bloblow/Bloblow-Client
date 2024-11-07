import { useState } from "react";

import asyncPostKeyword from "../../api/keyword/asyncPostKeyword";
import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/const";
import useBoundStore from "../../store/client/useBoundStore";
import CreateKeywordButton from "../Button/CreateKeywordButton";
import Portal from "../Common/Portal";
import SelectGroupDropDown from "../DropDown/SelectGroupDropDown";
import PlusIcon from "../Icon/PlusIcon";
import Button from "../UI/Button";
import Label from "../UI/Label";
import Loading from "../UI/Loading";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateKeywordModal = () => {
  const [isCreatingNewGroup, setIsCreatingNewGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [inputValue, setInputValue] = useState({
    newGroup: "",
    keyword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    newGroup: "",
    keyword: "",
    mutation: "",
  });
  const [groupList, setGroupList] = useState([
    {
      id: 1,
      name: "바닐라 코딩",
    },
    {
      id: 2,
      name: "바나프레소",
    },
    {
      id: 3,
      name: "이대호",
    },
    {
      id: 4,
      name: "무신사",
    },
    {
      id: 5,
      name: "해운대",
    },
  ]);

  const userId = useBoundStore((state) => state.userInfo.id);
  const addModal = useBoundStore((state) => state.addModal);
  const queryClient = useQueryClient();

  const createKeywordMutation = useMutation({
    mutationFn: (keywordInfo) => asyncPostKeyword(keywordInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userGroupList", userId] });
    },
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

  const handleGroupAddClick = () => {
    if (inputValue.newGroup === "") {
      setErrorMessage((prev) => ({ ...prev, newGroup: ERROR_MESSAGE.NEW_GROUP_EMPTY_INPUT_VALUE }));
      return;
    }

    const groupListLength = groupList.length;
    const theLastGroupId = groupList[groupListLength - 1].id;
    const newGroup = { id: theLastGroupId + 1, name: inputValue.newGroup };

    setSelectedGroup(inputValue.newGroup);
    setGroupList((prev) => [...prev, newGroup]);
    setIsCreatingNewGroup(false);
  };

  const handleKeywordSubmit = async (e) => {
    e.preventDefault();

    const keywordValue = inputValue.keyword;

    if (keywordValue === "") {
      setErrorMessage((prev) => ({ ...prev, keyword: ERROR_MESSAGE.KEYWORD_EMPTY_INPUT_VALUE }));
      return;
    }

    const keywordInfo = {
      groupId: "",
      groupName: selectedGroup,
      keyword: keywordValue,
      ownerId: userId,
    };

    createKeywordMutation.mutate(keywordInfo, {
      onSuccess: () => {
        addModal(MODAL_TYPE.CREATE_KEYWORD_SUCCESS);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  const isPending = createKeywordMutation.isPending;

  return (
    <Portal>
      <ModalBackground
        isDataFetching={isPending}
        isClear={true}
        modalType={MODAL_TYPE.CREATE_KEYWORD}
      >
        <ModalFrame
          isClear={true}
          isExistCloseButton={isPending ? false : true}
          modalType={MODAL_TYPE.CREATE_KEYWORD}
        >
          <form className="w-600 flex-col-center pt-40 gap-15" onSubmit={handleKeywordSubmit}>
            {isPending ? (
              <Loading width={600} height={300} text={"블로그를 가져오는 중입니다"} />
            ) : (
              <>
                <div className="w-full flex items-start mb-18 gap-20">
                  <Label
                    htmlFor="group"
                    styles="w-110 text-20 text-violet-900 font-semibold flex-shrink-0"
                  >
                    Group:
                  </Label>
                  <SelectGroupDropDown
                    selectedGroup={selectedGroup}
                    groupList={groupList}
                    setSelectedGroup={setSelectedGroup}
                  />
                  <PlusIcon
                    className="size-40 flex-shrink-0 fill-purple-300 cursor-pointer"
                    onClick={handleCreateNewGroupButtonClick}
                  />
                </div>
                {isCreatingNewGroup && (
                  <div className="w-full flex items-start gap-20">
                    <Label
                      htmlFor="newGroup"
                      styles="w-110 text-20 text-violet-900 font-semibold flex-shrink-0"
                    >
                      New Group:
                    </Label>
                    <div className="flex flex-col justify-center gap-3 w-full">
                      <input
                        type="text"
                        id="newGroup"
                        value={inputValue.newGroup}
                        onChange={handleNewGroupInputChange}
                        className="w-full h-40 px-15 border-2 border-purple-300 rounded-[8px] text-purple-900 font-semibold"
                        placeholder="새롭게 추가할 그룹명을 입력해주세요"
                      />
                      <p className="text-12 text-red-500 h-18 font-semibold">
                        {errorMessage.newGroup}
                      </p>
                    </div>
                    <Button
                      type="button"
                      styles="flex-center flex-shrink-0 px-14 py-6 font-medium border-2 border-purple-200 bg-purple-400/80 rounded-[15px] text-white text-18 hover:bg-purple-500/80"
                      onClick={handleGroupAddClick}
                    >
                      추가
                    </Button>
                  </div>
                )}
                <div className="w-full flex items-start gap-20">
                  <Label
                    htmlFor="keyword"
                    styles="w-110 text-20 text-violet-900 font-semibold flex-shrink-0"
                  >
                    Keyword:
                  </Label>
                  <div className="flex flex-col justify-start gap-3 w-full">
                    <input
                      type="text"
                      id="keyword"
                      value={inputValue.keyword}
                      onChange={handleKeywordInputChange}
                      className="w-full h-40 px-15 border-2 border-purple-300 rounded-[8px] text-purple-900 font-semibold"
                      placeholder="새롭게 추가할 키워드를 입력해주세요"
                    />
                    <p className="text-12 text-red-500 h-18 font-semibold">
                      {errorMessage.keyword}
                    </p>
                  </div>
                </div>
                <CreateKeywordButton disabled={isPending} />
              </>
            )}
          </form>
        </ModalFrame>
      </ModalBackground>
    </Portal>
  );
};

export default CreateKeywordModal;
