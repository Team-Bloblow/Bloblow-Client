import { useState } from "react";

import CreateKeywordButton from "../Button/CreateKeywordButton";
import Label from "../UI/Label";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";
import ModalMount from "./ModalMount";

const CreateKeywordModal = () => {
  const [groupValue, setGroupValue] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [keywordValue, setKeywordValue] = useState("");

  const handleInputChange = (e) => {
    setKeywordValue(e.target.value);
  };

  return (
    <ModalMount>
      <ModalBackground modalType="createKeyword">
        <ModalFrame modalType="createKeyword">
          <form className="w-450 h-220 flex-col-center pt-15 gap-30">
            <div className="w-full flex items-center gap-20">
              <Label
                htmlFor="group"
                styles="w-90 text-20 text-violet-900 font-semibold flex-shrink-0"
              >
                Group:
              </Label>
              <div className="w-full h-40 px-10 border-2 border-purple-300 rounded-[10px] text-purple-900 font-semibold"></div>
            </div>
            <div className="w-full flex items-center gap-20">
              <Label
                htmlFor="keyword"
                styles="w-90 text-20 text-violet-900 font-semibold flex-shrink-0"
              >
                Keyword:
              </Label>
              <input
                type="text"
                id="keyword"
                value={keywordValue}
                onChange={handleInputChange}
                className="w-full h-40 px-10 border-2 border-purple-300 rounded-[10px] text-purple-900 font-semibold"
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
