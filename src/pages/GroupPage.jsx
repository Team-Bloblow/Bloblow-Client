import { useState } from "react";
import { useParams } from "react-router-dom";

import asyncGetTotalPostCountList from "../api/group/asyncGetTotalPostCountList";
import asyncGetUserGroup from "../api/group/asyncGetUserGroup";
import GroupPeriodPostCountCard from "../components/Card/Chart/GroupPeriodPostCountCard";
import DashboardHeader from "../components/Header/DashboardHeader";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";
import useNoSignInRedirect from "../hooks/useNoSignInRedirect";
import useBoundStore from "../store/client/useBoundStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const GroupPage = () => {
  useNoSignInRedirect();

  const { groupId } = useParams();
  const [cursorId, setCursorId] = useState("");

  const setUserGroupList = useBoundStore((state) => state.setUserGroupList);
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const hasGroupId = !!groupId;
  const hasUserUid = !!userUid;

  const { data: userGroupList, isError: isUserGroupListError } = useQuery({
    queryKey: ["userGroupList"],
    queryFn: () => asyncGetUserGroup(userUid),
    enabled: hasUserUid,
    staleTime: 3 * 1000,
  });

  const {
    data: groupPostCountData,
    isError: isGroupPostCountDataError,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["groupPostCount", cursorId, groupId],
    queryFn: () => asyncGetTotalPostCountList(cursorId, groupId),
    placeholderData: keepPreviousData,
    enabled: hasUserUid && hasGroupId,
    staleTime: 5 * 1000,
  });

  const isError =
    isUserGroupListError ||
    isGroupPostCountDataError ||
    userGroupList?.message?.includes("Error occured") ||
    groupPostCountData?.message?.includes("Error occured");

  if (userGroupList?.groupListLength > 0 && userGroupList?.groupListResult?.length > 0) {
    setUserGroupList(userGroupList?.groupListResult);
  }

  if (userGroupList === undefined || groupPostCountData === undefined) {
    return null;
  }

  return (
    <main className="flex justify-start items-start mx-auto pt-67 h-screen w-full max-w-1440">
      <DashboardSidebar userGroupList={userGroupList?.groupListResult} groupId={groupId} />
      <section className="w-full h-full flex flex-col justify-start">
        <DashboardHeader userGroupList={userGroupList?.groupListResult} groupId={groupId} />
        <article className="flex flex-col border-r-2 border-slate-200/80 shadow-sm h-full">
          {isError ? (
            <div className="flex flex-center w-full h-full">
              에러가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다.
            </div>
          ) : (
            <div className="flex flex-col p-10 w-full h-full">
              <GroupPeriodPostCountCard
                groupPostCountData={groupPostCountData}
                setCursorId={setCursorId}
                isPlaceholderData={isPlaceholderData}
              />
            </div>
          )}
        </article>
      </section>
    </main>
  );
};

export default GroupPage;
