import asyncGetSpecificGroup from "../api/group/asyncGetSpecificGroup";
import GroupPeriodPostCountCard from "../components/Card/Chart/GroupPeriodPostCountCard";
import SampleDashboardHeader from "../components/Header/SampleDashboardHeader";
import SampleDashboardSidebar from "../components/Sidebar/SampleDashboardSidebar";
import { GROUP_CHART_TYPE } from "../config/constants";
import useSignInRedirect from "../hooks/useSignInRedirect";
import { useQuery } from "@tanstack/react-query";

const SampleGroupPage = () => {
  useSignInRedirect();

  const groupId = import.meta.env.VITE_SAMPLE_GROUP_ID;

  const { data: sampleGroupData, isError } = useQuery({
    queryKey: ["sampleGroupData"],
    queryFn: () => asyncGetSpecificGroup(groupId),
    staleTime: 3 * 1000,
  });

  const groupName = sampleGroupData?.name;
  const keywordList = sampleGroupData?.keywordIdList;

  if (isError) {
    return (
      <main className="flex flex-center mx-auto w-full h-screen max-w-1440">
        샘플 차트를 불러오는데 실패했습니다. 잠시 후 다시 시도해주시기 바랍니다.
      </main>
    );
  }

  if (sampleGroupData === undefined) {
    return null;
  }

  return (
    <main className="flex flex-col md:flex-row justify-start items-stretch mx-auto pt-67 w-full h-full max-w-1440">
      <SampleDashboardSidebar groupName={groupName} keywordList={keywordList} />
      <section className="flex flex-col justify-stretch w-full">
        <SampleDashboardHeader groupName={groupName} keywordList={keywordList} />
        <article className="flex flex-col border-l-1 border-b-2 border-r-2 border-slate-200/80 shadow-md w-full">
          <div className="flex flex-col gap-10 p-10 w-full">
            <GroupPeriodPostCountCard groupChartType={GROUP_CHART_TYPE.POST} groupId={groupId} />
            <div className="flex flex-col md:flex-row gap-10 w-full">
              <GroupPeriodPostCountCard groupChartType={GROUP_CHART_TYPE.LIKE} groupId={groupId} />
              <GroupPeriodPostCountCard
                groupChartType={GROUP_CHART_TYPE.COMMENT}
                groupId={groupId}
              />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default SampleGroupPage;
