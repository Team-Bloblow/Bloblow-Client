import { useRef, useState } from "react";

import useDropDown from "../../hooks/useDropDown";
import TriangleDownIcon from "../Icon/TriangleDownIcon";
import TriangleUpIcon from "../Icon/TriangleUpIcon";
import PropTypes from "prop-types";

const SelectGroupDropDown = ({ groupValue, setGroupValue }) => {
  const [groupList, setGroupList] = useState([
    {
      id: "1",
      name: "바닐라 코딩",
    },
    {
      id: "2",
      name: "바나프레소",
    },
    {
      id: "3",
      name: "이대호",
    },
    {
      id: "4",
      name: "무신사",
    },
    {
      id: "5",
      name: "해운대",
    },
    {
      id: "6",
      name: "새로 만들기",
    },
  ]);
  const dropDownBoxRef = useRef(null);
  const dropDownBoxWrapperRef = useRef(null);

  const dropDownRefList = [dropDownBoxRef, dropDownBoxWrapperRef];

  const [isDropDownOpen, setIsDropDownOpen] = useDropDown(dropDownRefList);

  const handleDropDownClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleListClick = (e) => {
    if (e.target.textContent === "새로 만들기") {
      console.log("새로 만들기");
    } else {
      setGroupValue(e.target.textContent);
    }
  };

  return (
    <div
      className="relative w-full cursor-pointer"
      ref={dropDownBoxRef}
      onClick={handleDropDownClick}
    >
      <div
        className="flex items-center gap-5 w-full h-40 px-15 border-2 border-purple-300 rounded-[10px] text-purple-900 font-semibold"
        ref={dropDownBoxWrapperRef}
      >
        <span className="flex-grow w-full">{groupValue}</span>
        {isDropDownOpen ? (
          <TriangleUpIcon className="size-20 fill-purple-300" />
        ) : (
          <TriangleDownIcon className="size-20 fill-purple-300" />
        )}
      </div>
      {isDropDownOpen && (
        <div
          className="absolute flex flex-col items-center top-50 w-full max-h-120 overflow-y-scroll bg-white z-modalDropDown border-purple-300 border-2 rounded-[10px] text-purple-900 font-semibold shadow-xl"
          id="selectGroupDropDown"
        >
          {groupList.map((group, index) => (
            <div
              key={group.id}
              className={`flex-center flex-shrink-0 w-full h-30 border-purple-300 hover:bg-neutral-100 ${index !== groupList.length - 1 && "border-b-1"}`}
              onClick={handleListClick}
            >
              {group.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectGroupDropDown;

SelectGroupDropDown.propTypes = {
  groupValue: PropTypes.string.isRequired,
  setGroupValue: PropTypes.func.isRequired,
};
