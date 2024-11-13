import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import RevertIcon from "../Icon/RevertIcon";
import CreateKeywordModal from "../Modal/CreateKeywordModal";
import CreateKeywordSuccessModal from "../Modal/CreateKeywordSuccessModal";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const DashboardSidebar = ({ userGroupList, groupId }) => {
  const addModal = useBoundStore((state) => state.addModal);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);

  const dashboardGroup = userGroupList?.find((groupInfo) => groupInfo._id === groupId);
  const dashboardGroupName = dashboardGroup?.name;
  const dashboardKeywordList = dashboardGroup?.keywordIdList;

  const handleCreateKeywordButton = () => {
    addModal(MODAL_TYPE.CREATE_KEYWORD.DEFAULT);
  };

  return (
    <nav className="flex flex-col justify-between w-250 h-full flex-shrink-0 bg-white border-l-2 border-r-2 border-slate-200/80 shadow-lg">
      <div className="flex flex-col justify-start w-full">
        <Button
          styles="flex items-center gap-12 w-full h-30 px-30 py-10 text-14 border-b-2 border-slate-200/80 opacity-70 bg-white hover:opacity-90"
          destination="/myPage"
        >
          <RevertIcon className="size-14 fill-black" />
          마이페이지
        </Button>
        <Button
          styles="flex items-center gap-12 w-full h-70 px-30 py-10 text-24 border-b-2 border-slate-200/80 font-bold bg-slate-200 opacity-70 hover:opacity-85"
          destination={`/dashboard/${groupId}`}
        >
          {dashboardGroupName}
        </Button>
        {dashboardKeywordList.map((dashboardKeyword) => {
          const keywordId = dashboardKeyword._id;
          const keywordName = dashboardKeyword.keyword;

          return (
            <Button
              key={keywordId}
              styles="flex items-center gap-12 w-full h-40 px-30 py-10 text-18 border-b-2 border-slate-200/80 opacity-70 bg-white hover:opacity-90"
              destination={`/dashboard/${groupId}/${keywordId}`}
            >
              # {keywordName}
            </Button>
          );
        })}
      </div>
      <Button
        styles="flex-center w-full h-70 px-30 py-10 text-18 text-gray-900/80 border-t-2 border-b-2 border-slate-200/80 font-semibold hover:bg-slate-100/50"
        onClick={handleCreateKeywordButton}
      >
        키워드 만들기
      </Button>
      {openModalTypeList.includes(MODAL_TYPE.CREATE_KEYWORD.DEFAULT) && (
        <CreateKeywordModal
          createType={MODAL_TYPE.CREATE_KEYWORD.DASHBOARD}
          selectedGroupId={groupId}
          selectedGroupName={dashboardGroupName}
        />
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.CREATE_KEYWORD_SUCCESS && (
        <CreateKeywordSuccessModal />
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ERROR && (
        <ErrorModal errorMessage={ERROR_MESSAGE.CREATE_KEYWORD_ERROR} />
      )}
    </nav>
  );
};

export default DashboardSidebar;

DashboardSidebar.propTypes = {
  userGroupList: PropTypes.array.isRequired,
  groupId: PropTypes.string.isRequired,
};
