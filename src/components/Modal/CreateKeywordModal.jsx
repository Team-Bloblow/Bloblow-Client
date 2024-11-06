import { useState } from "react";

import CreateKeywordButton from "../Button/CreateKeywordButton";
import SelectGroupDropDown from "../DropDown/SelectGroupDropDown";
import Button from "../UI/Button";
import Label from "../UI/Label";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import ModalMount from "./ModalMount";

const CreateKeywordModal = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [newGroupValue, setNewGroupValue] = useState("");
  const [keywordValue, setKeywordValue] = useState("");
  const [isCreateNewGroup, setIsCreateNewGroup] = useState(false);
  const [groupList, setGroupList] = useState([
    {
      id: 0,
      name: "새로 만들기",
    },
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

  const handleNewGroupInputChange = (e) => {
    setNewGroupValue(e.target.value);
  };

  const handleKeywordInputChange = (e) => {
    setKeywordValue(e.target.value);
  };

  const handleGroupDecideClick = () => {
    const groupListLength = groupList.length;
    const theLastGroupId = groupList[groupListLength - 1].id;
    const newGroup = { id: theLastGroupId + 1, name: newGroupValue };

    setSelectedGroup(newGroupValue);
    setGroupList((prev) => [...prev, newGroup]);
  };

  const handleKeywordSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ModalMount>
      <ModalBackground modalType="createKeyword">
        <ModalFrame modalType="createKeyword">
          <form className="w-600 flex-col-center pt-35 gap-25" onSubmit={handleKeywordSubmit}>
            <div className="w-full flex items-center gap-20">
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
                setIsCreateNewGroup={setIsCreateNewGroup}
              />
            </div>
            {isCreateNewGroup && (
              <div className="w-full flex items-center gap-20">
                <Label
                  htmlFor="newGroup"
                  styles="w-110 text-20 text-violet-900 font-semibold flex-shrink-0"
                >
                  New Group:
                </Label>
                <input
                  type="text"
                  id="newGroup"
                  value={newGroupValue}
                  onChange={handleNewGroupInputChange}
                  className="w-full h-40 px-15 border-2 border-purple-300 rounded-[10px] text-purple-900 font-semibold"
                  placeholder="새롭게 추가할 그룹명을 입력해주세요"
                />
                <Button
                  type="button"
                  styles="flex-center flex-shrink-0 px-14 py-8 font-medium border-2 border-purple-200 bg-purple-400/80 rounded-[15px] text-white text-18 hover:bg-purple-500/80"
                  onClick={handleGroupDecideClick}
                >
                  확정
                </Button>
              </div>
            )}
            <div className="w-full flex items-center gap-20">
              <Label
                htmlFor="keyword"
                styles="w-110 text-20 text-violet-900 font-semibold flex-shrink-0"
              >
                Keyword:
              </Label>
              <input
                type="text"
                id="keyword"
                value={keywordValue}
                onChange={handleKeywordInputChange}
                className="w-full h-40 px-15 border-2 border-purple-300 rounded-[10px] text-purple-900 font-semibold"
                placeholder="새롭게 추가할 키워드를 입력해주세요"
              />
            </div>
            <CreateKeywordButton />
          </form>
        </ModalFrame>
      </ModalBackground>
    </ModalMount>
  );
};

export default CreateKeywordModal;
