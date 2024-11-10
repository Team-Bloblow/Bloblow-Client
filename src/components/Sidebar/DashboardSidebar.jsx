import { useParams } from "react-router-dom";

import asyncGetUserGroup from "../../api/group/asyncGetUserGroup";
import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import LinkIcon from "../Icon/LinkIcon";
import RevertIcon from "../Icon/RevertIcon";
import CreateKeywordModal from "../Modal/CreateKeywordModal";
import CreateKeywordSuccessModal from "../Modal/CreateKeywordSuccessModal";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";
import { useQuery } from "@tanstack/react-query";

const DashboardSidebar = () => {
  const { groupId } = useParams();
  const addModal = useBoundStore((state) => state.addModal);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);
  const setUserGroupList = useBoundStore((state) => state.setUserGroupList);
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const hasUserUid = !!userUid;

  const { data: userGroupList } = useQuery({
    queryKey: ["userGroupList"],
    queryFn: () => asyncGetUserGroup(userUid),
    enabled: hasUserUid,
  });

  if (userGroupList?.groupListResult > 0 && userGroupList?.groupListResult?.length > 0) {
    setUserGroupList(userGroupList?.groupListResult);
  }

  const dashboardGroup = userGroupList?.groupListResult?.find(
    (groupInfo) => groupInfo._id === groupId
  );
  const dashboardGroupName = dashboardGroup?.name;
  const dashboardKeywordList = dashboardGroup?.keywordIdList;

  const handleCreateKeywordButton = () => {
    addModal(MODAL_TYPE.CREATE_KEYWORD);
  };

  return (
    <aside className="flex flex-col justify-between w-250 h-full flex-shrink-0 bg-white border-l-2 border-r-2 border-violet-50 shadow-lg">
      <div className="flex flex-col justify-start w-full">
        <Button
          styles="flex items-center gap-12 w-full h-30 px-30 py-10 text-14 border-b-2 border-violet-100 opacity-70 bg-pink-50/10 hover:opacity-90"
          destination="/myPage"
        >
          <RevertIcon className="size-14 fill-black" />
          마이페이지
        </Button>
        <Button
          styles="flex items-center gap-12 w-full h-70 px-30 py-10 text-20 border-b-2 border-violet-100 font-bold bg-gradient-to-r from-[#9996EF] to-[#F9C7D4] opacity-70 hover:opacity-85"
          destination={`/dashboard/${groupId}`}
        >
          <LinkIcon className="size-25 fill-black" />
          {dashboardGroupName}
        </Button>
        {dashboardKeywordList.map((dashboardKeyword) => {
          const keywordId = dashboardKeyword._id;
          const keywordName = dashboardKeyword.keyword;

          return (
            <Button
              key={keywordId}
              styles="flex items-center gap-12 w-full h-70 px-30 py-10 text-18 border-b-2 border-violet-100 font-semibold opacity-70 bg-pink-50/10 hover:opacity-90"
              destination={`/dashboard/${groupId}/${keywordId}`}
            >
              <LinkIcon className="size-25 fill-black" />
              {keywordName}
            </Button>
          );
        })}
      </div>
      <Button
        styles="flex-center w-full h-70 px-30 py-10 text-18 text-pink-900/80 border-t-2 border-b-2 border-violet-100 font-semibold hover:bg-pink-50"
        onClick={handleCreateKeywordButton}
      >
        키워드 만들기
      </Button>
      {openModalTypeList.includes(MODAL_TYPE.CREATE_KEYWORD) && (
        <CreateKeywordModal
          createType="dashboard"
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
    </aside>
  );
};

export default DashboardSidebar;
