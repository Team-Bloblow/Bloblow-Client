import { useRef } from "react";
import { useParams } from "react-router-dom";

import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useDropDown from "../../hooks/useDropDown";
import useBoundStore from "../../store/client/useBoundStore";
import ClickIcon from "../Icon/ClickIcon";
import HashtagIcon from "../Icon/HashtagIcon";
import RevertIcon from "../Icon/RevertIcon";
import CreateKeywordModal from "../Modal/CreateKeywordModal";
import CreateKeywordSuccessModal from "../Modal/CreateKeywordSuccessModal";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const DashboardSidebar = ({ userGroupList, groupId, keywordId }) => {
  const addModal = useBoundStore((state) => state.addModal);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);
  const params = useParams();
  const containerRef = useRef(null);

  const [isDropDownOpen, setIsDropDownOpen] = useDropDown(containerRef);

  const dashboardGroup = userGroupList?.find((groupInfo) => groupInfo._id === groupId);
  const dashboardGroupName = dashboardGroup?.name;
  const dashboardKeywordList = dashboardGroup?.keywordIdList;
  const currentKeywordName =
    keywordId &&
    dashboardKeywordList?.find((keywordInfo) => keywordInfo._id === keywordId)?.keyword;

  const checkActiveDashboard = (dashboardType, keywordId) => {
    if (dashboardType === "group" && params?.keywordId === undefined) {
      return "bg-gray-100 border-l-2 md:border-l-4 md:border-slate-700 text-slate-900";
    }

    if (dashboardType === "keyword" && params?.keywordId === keywordId) {
      return "bg-gray-100 opacity-90 font-semibold border-l-4 border-slate-700 text-slate-900";
    }
  };

  const handleCreateKeywordButton = () => {
    addModal(MODAL_TYPE.CREATE_KEYWORD.DEFAULT);
  };

  return (
    <nav className="flex md:flex-col flex-row w-full md:w-250 flex-shrink-0 bg-white border-l-2 md:border-r-2 border-b-1 border-r-2 border-slate-200/80 shadow-lg">
      <Button
        styles="flex items-center gap-12 md:w-full md:h-40 h-full px-12 md:px-30 py-10 md:text-14 text-13 md:border-b-2 border-slate-200/80 opacity-70 bg-white hover:opacity-90"
        destination="/myPage"
      >
        <RevertIcon className="size-16 md:size-20 fill-black" />
        <span className="hidden md:inline">마이페이지</span>
      </Button>
      <div className="flex-shrink-0">
        <Button
          styles={`flex break-keep items-center md:gap-12 md:w-full md:h-58 h-50 md:px-30 px-10 py-10 md:text-22 text-14 text-slate-700 border-l-2 border-r-2 md:border-0 border-slate-200/80 font-semibold hover:opacity-70 ${checkActiveDashboard("group")}`}
          destination={`/dashboard/${groupId}`}
        >
          {dashboardGroupName.length > 7
            ? `${dashboardGroupName.slice(0, 7)}...`
            : dashboardGroupName}
        </Button>
      </div>
      <div className="hidden md:flex flex-col">
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
      <div
        ref={containerRef}
        className={`relative flex w-full flex-grow items-center md:hidden gap-4 cursor-pointer text-12 ${currentKeywordName && "bg-gray-100"}`}
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
      >
        {keywordId ? (
          <HashtagIcon className="ml-10 w-12 h-12 pointer-events-none" />
        ) : (
          <ClickIcon className="ml-6 w-12 h-12 pointer-events-none" />
        )}
        {currentKeywordName ? (
          currentKeywordName
        ) : (
          <span className=" pointer-events-none text-10 text-slate-700">
            키워드 대시보드로 이동
          </span>
        )}
        {isDropDownOpen &&
          (dashboardKeywordList.length > 0 ? (
            <div className="absolute top-55 flex flex-col w-full bg-white border-2 border-slate-200/80 shadow-lg z-header">
              {dashboardKeywordList.map((dashboardKeyword) => {
                const keywordId = dashboardKeyword._id;
                const keywordName = dashboardKeyword.keyword;

                return (
                  <Button
                    key={keywordId}
                    styles={`flex items-center gap-6 w-full h-46 px-10 py-10 text-13 text-slate-700 hover:opacity-70 hover:bg-gray-200/30 ${checkActiveDashboard("keyword", keywordId)}`}
                    destination={`/dashboard/${groupId}/${keywordId}`}
                  >
                    <HashtagIcon className="-mt-1 w-13 h-13" />
                    {keywordName.length > 7 ? `${keywordName.slice(0, 7)}...` : keywordName}
                  </Button>
                );
              })}
            </div>
          ) : (
            <div className="absolute top-55 flex-center px-10 py-10 w-full bg-white border-2 border-slate-200/80 shadow-lg z-header">
              생성한 키워드가 없습니다. 키워드를 생성해주세요.
            </div>
          ))}
      </div>
      <Button
        styles="flex-center flex-shrink-0 md:h-70 h-50 md:px-30 px-8 md:py-10 text-12 md:text-18 text-gray-900/80 md:border-t-2 md:border-b-2 border-l-2 md:border-l-0 border-slate-200/80 font-semibold hover:bg-emerald-100/10 hover:border-emerald-900/20"
        onClick={handleCreateKeywordButton}
      >
        + 키워드 만들기
      </Button>
      {openModalTypeList.includes(MODAL_TYPE.CREATE_KEYWORD.DEFAULT) && (
        <CreateKeywordModal selectedGroupId={groupId} selectedGroupName={dashboardGroupName} />
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
  keywordId: PropTypes.string,
};
