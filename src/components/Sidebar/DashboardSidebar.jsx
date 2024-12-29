import { useParams } from "react-router-dom";

import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import HashtagIcon from "../Icon/HashtagIcon";
import RevertIcon from "../Icon/RevertIcon";
import CreateKeywordModal from "../Modal/CreateKeywordModal";
import CreateKeywordSuccessModal from "../Modal/CreateKeywordSuccessModal";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const DashboardSidebar = ({ userGroupList, groupId }) => {
  const addModal = useBoundStore((state) => state.addModal);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);
  const params = useParams();

  const dashboardGroup = userGroupList?.find((groupInfo) => groupInfo._id === groupId);
  const dashboardGroupName = dashboardGroup?.name;
  const dashboardKeywordList = dashboardGroup?.keywordIdList;

  const checkActiveDashboard = (dashboardType, keywordId) => {
    if (dashboardType === "group" && params?.keywordId === undefined) {
      return "bg-gray-100 border-l-4 border-slate-700 text-slate-900";
    }

    if (dashboardType === "keyword" && params?.keywordId === keywordId) {
      return "bg-gray-100 opacity-90 font-semibold border-l-4 border-slate-700 text-slate-900";
    }

    return "";
  };

  const handleCreateKeywordButton = () => {
    addModal(MODAL_TYPE.CREATE_KEYWORD.DEFAULT);
  };

  return (
    <nav className="flex flex-col w-250 flex-shrink-0 bg-white border-l-2 border-r-2 border-slate-200/80 shadow-lg">
      <div className="flex flex-col">
        <Button
          styles="flex items-center gap-12 w-full h-40 px-30 py-10 text-14 border-b-2 border-slate-200/80 opacity-70 bg-white hover:opacity-90"
          destination="/myPage"
        >
          <RevertIcon className="size-20 fill-black" />
          마이페이지
        </Button>
        <Button
          styles={`flex items-center gap-12 w-full h-58 px-30 py-10 text-22 text-slate-700 font-semibold hover:opacity-70 ${checkActiveDashboard("group")}`}
          destination={`/dashboard/${groupId}`}
        >
          {dashboardGroupName.length > 8
            ? `${dashboardGroupName.slice(0, 8)}...`
            : dashboardGroupName}
        </Button>
        {dashboardKeywordList.map((dashboardKeyword) => {
          const keywordId = dashboardKeyword._id;
          const keywordName = dashboardKeyword.keyword;

          return (
            <Button
              key={keywordId}
              styles={`flex items-center gap-6 w-full h-46 px-30 py-10 text-18 text-slate-700 hover:opacity-70 ${checkActiveDashboard("keyword", keywordId)}`}
              destination={`/dashboard/${groupId}/${keywordId}`}
            >
              <HashtagIcon className="w-20 h-20" />
              {keywordName.length > 8 ? `${keywordName.slice(0, 8)}...` : keywordName}
            </Button>
          );
        })}
      </div>
      <Button
        styles="flex-center w-full h-70 px-30 py-10 text-18 text-gray-900/80 border-t-2 border-b-2 border-slate-200/80 font-semibold hover:bg-emerald-100/10 hover:border-emerald-900/20"
        onClick={handleCreateKeywordButton}
      >
        + 키워드 만들기
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
