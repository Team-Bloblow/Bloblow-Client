import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import asyncGetUserGroup from "../api/group/asyncGetUserGroup";
import GroupPeriodPostCountCard from "../components/Card/Chart/GroupPeriodPostCountCard";
import DashboardHeader from "../components/Header/DashboardHeader";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";
import { GROUP_CHART_TYPE } from "../config/constants";
import useNoSignInRedirect from "../hooks/useNoSignInRedirect";
import useBoundStore from "../store/client/useBoundStore";
import { useQuery } from "@tanstack/react-query";

const SampleGroupPage = () => {
  useNoSignInRedirect();

  const { groupId } = useParams();
  const navigate = useNavigate();

  const setUserGroupList = useBoundStore((state) => state.setUserGroupList);
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const hasUserUid = !!userUid;

  const { data: userGroupList, isError: isUserGroupListError } = useQuery({
    queryKey: ["userGroupList", userUid],
    queryFn: () => asyncGetUserGroup(userUid),
    enabled: hasUserUid,
    staleTime: 3 * 1000,
  });

  useEffect(() => {
    const validGroupId = userGroupList?.groupListResult?.find(
      (groupInfo) => groupInfo._id === groupId
    );

    if (userGroupList?.groupListLength > 0 && userGroupList?.groupListResult?.length > 0) {
      setUserGroupList(userGroupList?.groupListResult);
    }

    if (userGroupList && validGroupId === undefined) {
      navigate("/notFoundPage");

      return;
    }
  }, [userGroupList, setUserGroupList, groupId, navigate]);

  const isError = isUserGroupListError || userGroupList?.message?.includes("Error occured");

  if (isError) {
    return (
      <main className="flex flex-center mx-auto w-full h-screen max-w-1440">
        차트를 불러오는데 실패했습니다. 잠시 후 다시 시도해주시기 바랍니다.
      </main>
    );
  }

  if (userGroupList === undefined) {
    return null;
  }

  return (
    <main className="flex flex-col md:flex-row justify-start items-stretch mx-auto pt-67 w-full h-full max-w-1440">
      <DashboardSidebar userGroupList={userGroupList?.groupListResult} groupId={groupId} />
      <section className="flex flex-col justify-stretch w-full">
        <DashboardHeader
          userGroupList={userGroupList?.groupListResult}
          groupId={groupId}
          userUid={userUid}
        />
        <article className="flex flex-col border-l-1 border-b-2 border-r-2 border-slate-200/80 shadow-md w-full">
          <div className="flex flex-col gap-10 p-10 w-full">
            <GroupPeriodPostCountCard
              groupChartType={GROUP_CHART_TYPE.POST}
              groupId={groupId}
              hasUserUid={hasUserUid}
            />
            <div className="flex flex-col md:flex-row gap-10 w-full">
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

export default SampleGroupPage;
