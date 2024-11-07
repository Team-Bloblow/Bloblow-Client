import PropTypes from "prop-types";

const SelectGroupOptionList = ({ groupList, selectedGroup, setSelectedGroup }) => {
  const handleListClick = (groupName) => {
    setSelectedGroup(groupName);
  };

  return (
    <div
      className="absolute flex flex-col items-center top-50 right-0 w-full max-h-120 overflow-y-scroll bg-white z-modalDropDown border-purple-300 border-2 rounded-[10px] text-purple-900 font-semibold shadow-xl"
      id="selectGroupDropDown"
    >
      {groupList.map((group, index) => {
        const groupName = group.name;

        return (
          <div
            key={group.id}
            className={`flex-center flex-shrink-0 w-full h-30 border-purple-300 hover:bg-neutral-100 ${selectedGroup === groupName && "bg-violet-100/80"} ${index !== groupList.length - 1 && "border-b-1"} ${groupName === "새로 만들기" && "text-rose-400"}`}
            onClick={() => handleListClick(groupName)}
          >
            {groupName}
          </div>
        );
      })}
    </div>
  );
};

export default SelectGroupOptionList;

SelectGroupOptionList.propTypes = {
  groupList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  selectedGroup: PropTypes.string.isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
};
