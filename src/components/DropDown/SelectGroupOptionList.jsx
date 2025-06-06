import PropTypes from "prop-types";

const SelectGroupOptionList = ({ groupList, selectedGroup, setSelectedGroup }) => {
  const handleListClick = (groupId, groupName) => {
    setSelectedGroup((prev) => ({ ...prev, id: groupId, name: groupName }));
  };

  if (groupList?.length === 0) {
    return (
      <div
        className="absolute flex-center top-50 right-0 w-full h-35 bg-white z-modalDropDown border-black border-2 rounded-[5px] text-black font-semibold shadow-xl"
        id="selectGroupDropDown"
      >
        현재 생성한 그룹이 없습니다.
      </div>
    );
  }

  return (
    <div
      className="absolute flex flex-col items-center top-50 right-0 w-full max-h-120 overflow-y-scroll bg-white z-modalDropDown border-black border-2 rounded-[5px] text-black font-semibold shadow-xl"
      id="selectGroupDropDown"
    >
      {groupList?.map((group, index) => {
        const groupId = group.id;
        const groupName = group.name;

        return (
          <div
            key={groupId}
            className={`flex-center flex-shrink-0 w-full h-30 border-black hover:bg-emerald-100/30 ${selectedGroup.id === groupId && "bg-emerald-800/30"} ${index !== groupList.length - 1 && "border-b-1"}`}
            onClick={() => handleListClick(groupId, groupName)}
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
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  selectedGroup: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
};
