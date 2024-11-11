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

  const { data: userGroupList } = useQuery({
    queryKey: ["userGroupList"],
    queryFn: () => asyncGetUserGroup(userUid),
    enabled: hasUserUid,
  });

  if (userGroupList?.groupListResult > 0 && userGroupList?.groupListResult?.length > 0) {
    setUserGroupList(userGroupList?.groupListResult);
  }

  return (
    <main className="flex justify-start items-start mx-auto pt-67 h-screen w-full max-w-1440">
      <DashboardSidebar userGroupList={userGroupList?.groupListResult} groupId={groupId} />
      <section className="w-full h-full flex flex-col justify-start">
        <DashboardHeader userGroupList={userGroupList?.groupListResult} groupId={groupId} />
      </section>
      <Outlet />
    </main>
  );
};

export default GroupPage;
