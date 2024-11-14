import { useParams } from "react-router-dom";

import asyncGetUserGroup from "../api/group/asyncGetUserGroup";
import DashboardHeader from "../components/Header/DashboardHeader";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";
import useNoSignInRedirect from "../hooks/useNoSignInRedirect";
import useBoundStore from "../store/client/useBoundStore";
import { useQuery } from "@tanstack/react-query";

const GroupPage = () => {
  useNoSignInRedirect();

  const { groupId } = useParams();

  const setUserGroupList = useBoundStore((state) => state.setUserGroupList);
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const hasUserUid = !!userUid;

  const { data: userGroupList, isError: isUserGroupListError } = useQuery({
    queryKey: ["userGroupList"],
    queryFn: () => asyncGetUserGroup(userUid),
    enabled: hasUserUid,
  });

  const isError = isUserGroupListError || userGroupList?.message?.includes("Error occured");

  if (userGroupList?.groupListLength > 0 && userGroupList?.groupListResult?.length > 0) {
    setUserGroupList(userGroupList?.groupListResult);
  }

  if (userGroupList === undefined) {
    return null;
  }

  return (
    <main className="flex justify-start items-start mx-auto pt-67 h-screen w-full max-w-1440">
      <DashboardSidebar userGroupList={userGroupList?.groupListResult} groupId={groupId} />
      <section className="w-full h-full flex flex-col justify-start">
        <DashboardHeader userGroupList={userGroupList?.groupListResult} groupId={groupId} />
        {isError && (
          <div className="flex flex-center w-full h-full">
            에러가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다.
          </div>
        )}
      </section>
    </main>
  );
};

export default GroupPage;
