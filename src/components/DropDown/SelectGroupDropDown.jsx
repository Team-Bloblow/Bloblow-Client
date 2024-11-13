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
      className="relative flex items-center gap-5 w-full h-40 px-15 border-2 border-black rounded-[5px] text-gray-800 font-semibold cursor-pointer"
      ref={dropDownBoxRef}
      onClick={handleDropDownClick}
    >
      <span className="flex-grow w-full" ref={dropDownBoxTextRef}>
        {selectedGroup?.name}
      </span>
      {isDropDownOpen ? (
        <TriangleUpIcon className="size-20 fill-black" />
      ) : (
        <TriangleDownIcon className="size-20 fill-black" />
      )}
      {isDropDownOpen && (
        <SelectGroupOptionList
          groupList={groupList}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      )}
    </div>
  );
});

export default SelectGroupDropDown;

SelectGroupDropDown.propTypes = {
  selectedGroup: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  groupList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
};
