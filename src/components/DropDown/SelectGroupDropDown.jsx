import { memo, useRef } from "react";

import useDropDown from "../../hooks/useDropDown";
import TriangleDownIcon from "../Icon/TriangleDownIcon";
import TriangleUpIcon from "../Icon/TriangleUpIcon";
import SelectGroupOptionList from "./SelectGroupOptionList";
import PropTypes from "prop-types";

const SelectGroupDropDown = memo(function SelectGroupDropDown({
  selectedGroup,
  groupList,
  setSelectedGroup,
  setIsCreateNewGroup,
}) {
  const dropDownBoxRef = useRef(null);
  const dropDownBoxTextRef = useRef(null);
  const dropDownRefList = [dropDownBoxRef, dropDownBoxTextRef];

  const [isDropDownOpen, setIsDropDownOpen] = useDropDown(dropDownRefList);

  const handleDropDownClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div
      className="relative flex items-center gap-5 w-full h-40 px-15 border-2 border-purple-300 rounded-[10px] text-purple-900 font-semibold cursor-pointer"
      ref={dropDownBoxRef}
      onClick={handleDropDownClick}
    >
      <span className="flex-grow w-full" ref={dropDownBoxTextRef}>
        {selectedGroup}
      </span>
      {isDropDownOpen ? (
        <>
          <TriangleUpIcon className="size-20 fill-purple-300" />
          <SelectGroupOptionList
            groupList={groupList}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            setIsCreateNewGroup={setIsCreateNewGroup}
          />
        </>
      ) : (
        <TriangleDownIcon className="size-20 fill-purple-300" />
      )}
    </div>
  );
});

export default SelectGroupDropDown;

SelectGroupDropDown.propTypes = {
  selectedGroup: PropTypes.string.isRequired,
  groupList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
  setIsCreateNewGroup: PropTypes.func.isRequired,
};
