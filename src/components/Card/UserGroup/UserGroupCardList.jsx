import { useEffect } from "react";

import asyncGetUserGroup from "../../../api/group/asyncGetUserGroup";
import { ERROR_MESSAGE, MODAL_TYPE } from "../../../config/constants";
import useBoundStore from "../../../store/client/useBoundStore";
import CreateGroupModal from "../../Modal/CreateGroupModal";
import CreateKeywordSuccessModal from "../../Modal/CreateKeywordSuccessModal";
import ErrorModal from "../../Modal/ErrorModal";
import Button from "../../UI/Button";
import UserGroupCard from "./UserGroupCard";
import { useQuery } from "@tanstack/react-query";

const UserGroupCardList = () => {
  const setUserGroupList = useBoundStore((state) => state.setUserGroupList);
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const addModal = useBoundStore((state) => state.addModal);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);
  const hasUserUid = !!userUid;

  const handleCreateGroupButtonClick = () => {
    addModal(MODAL_TYPE.CREATE_GROUP);
  };

  const { data: userGroupList, isError } = useQuery({
    queryKey: ["userGroupList", userUid],
    queryFn: () => asyncGetUserGroup(userUid),
    enabled: hasUserUid,
  });

  useEffect(() => {
    if (hasUserUid && userGroupList?.groupListResult?.length > 0) {
      setUserGroupList(userGroupList?.groupListResult);
    }
  }, [hasUserUid, userGroupList?.groupListResult, setUserGroupList]);

  if (isError || userGroupList?.message?.includes("Error occured")) {
    return (
      <div className="flex flex-center w-full h-full">
        에러가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다.
      </div>
    );
  }

  if (userGroupList?.groupListLength === 0) {
    return (
      <div className="flex flex-col justify-start bg-white w-full md:w-2/3 h-full">
        <Button
          styles="w-full px-10 md:px-20 md:py-18 py-5 text-21 text-gray-400 font-semibold border-2 border-slate-200/80 rounded-[5px] bg-gray-100 hover:shadow hover:border-gray-300 flex-shrink-0"
          onClick={handleCreateGroupButtonClick}
        >
          + 그룹 만들기
        </Button>
        <p className="flex-grow w-full h-full flex-center">생성한 그룹이 없습니다</p>
        {openModalTypeList.includes(MODAL_TYPE.CREATE_GROUP) && <CreateGroupModal />}
        {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.CREATE_KEYWORD_SUCCESS && (
          <CreateKeywordSuccessModal />
        )}
        {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ERROR && (
          <ErrorModal errorMessage={ERROR_MESSAGE.CREATE_KEYWORD_ERROR} />
        )}
      </div>
    );
  }

  return (
    <section className="flex flex-col justify-start gap-15 bg-white rounded-[1px] w-full md:w-2/3 h-full">
      <Button
        styles="w-full px-10 md:px-20 md:py-18 py-5 text-21 text-gray-400 font-semibold border-2 border-slate-200/80 rounded-[5px] bg-gray-100 hover:shadow hover:border-gray-300"
        onClick={handleCreateGroupButtonClick}
      >
        + 그룹 만들기
      </Button>
      {userGroupList?.groupListResult?.map((groupInfo) => (
        <UserGroupCard
          key={groupInfo?._id}
          groupId={groupInfo?._id}
          groupName={groupInfo?.name}
          keywordList={groupInfo?.keywordIdList}
          updatedAt={groupInfo?.updatedAt}
        />
      ))}
      {openModalTypeList.includes(MODAL_TYPE.CREATE_GROUP) && <CreateGroupModal />}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.CREATE_KEYWORD_SUCCESS && (
        <CreateKeywordSuccessModal />
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ERROR && (
        <ErrorModal errorMessage={ERROR_MESSAGE.CREATE_KEYWORD_ERROR} />
      )}
    </section>
  );
};

export default UserGroupCardList;
