import { useRef, useState } from "react";

import useDropDown from "../../hooks/useDropDown";
import PropTypes from "prop-types";

const SelectGroupDropDown = ({ groupValue, setGroupValue }) => {
  const [groupList, setGroupList] = useState([]);
  const dropDownBoxRef = useRef(null);

  const [isDropDownOpen, setIsDropDownOpen] = useDropDown(dropDownBoxRef);

  const handleDropDownClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className="relative w-full" ref={dropDownBoxRef} onClick={handleDropDownClick}>
      <div className="w-full h-40 px-10 border-2 border-purple-300 rounded-[10px] text-purple-900 font-semibold"></div>
    </div>
  );
};

export default SelectGroupDropDown;

SelectGroupDropDown.propTypes = {
  groupValue: PropTypes.string.isRequired,
  setGroupValue: PropTypes.func.isRequired,
};
