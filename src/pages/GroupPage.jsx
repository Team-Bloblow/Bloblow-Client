import { useParams } from "react-router-dom";

import asyncGetUserGroup from "../api/group/asyncGetUserGroup";
import GroupPeriodPostCountCard from "../components/Card/Chart/GroupPeriodPostCountCard";
import DashboardHeader from "../components/Header/DashboardHeader";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";
import { GROUP_CHART_TYPE } from "../config/constants";
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
    staleTime: 3 * 1000,
  });

  const isError = isUserGroupListError || userGroupList?.message?.includes("Error occured");

  if (isError) {
    <main className="flex flex-center mx-auto w-full h-screen max-w-1440">
      에러가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다.
    </main>;
  }

  if (userGroupList === undefined) {
    return null;
  }

  if (userGroupList?.groupListLength > 0 && userGroupList?.groupListResult?.length > 0) {
    setUserGroupList(userGroupList?.groupListResult);
  }

  return (
    <main className="flex justify-start items-start mx-auto pt-67 h-screen w-full max-w-1440">
      <DashboardSidebar userGroupList={userGroupList?.groupListResult} groupId={groupId} />
      <section className="flex flex-col justify-start w-full">
        <DashboardHeader userGroupList={userGroupList?.groupListResult} groupId={groupId} />
        <article className="flex flex-col border-r-2 border-slate-200/80 shadow-sm h-full mb-30">
          <div className="flex flex-col gap-10 p-10 w-full h-full">
            <GroupPeriodPostCountCard
              groupChartType={GROUP_CHART_TYPE.POST}
              groupId={groupId}
              hasUserUid={hasUserUid}
            />
            <div className="flex gap-10">
              <GroupPeriodPostCountCard
                groupChartType={GROUP_CHART_TYPE.LIKE}
                groupId={groupId}
                hasUserUid={hasUserUid}
              />
              <GroupPeriodPostCountCard
                groupChartType={GROUP_CHART_TYPE.COMMENT}
                groupId={groupId}
                hasUserUid={hasUserUid}
              />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default GroupPage;
