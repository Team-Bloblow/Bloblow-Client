import asyncGetGroupSummary from "../../api/group/asyncGet\bGroupSummary";
import useBoundStore from "../../store/client/useBoundStore";
import getDateDiff from "../../utils/getDateDiff";
import { useQuery } from "@tanstack/react-query";

const GroupSummary = () => {
  const userUid = useBoundStore((state) => state.userInfo.uid);

  const {
    data: summaryData,
    isError: summaryDataError,
    isPending: summaryDataPending,
  } = useQuery({
    queryKey: ["lastUpdateGroupSummary", userUid],
    queryFn: () => asyncGetGroupSummary(userUid),
    enabled: !!userUid,
    staleTime: 5 * 1000,
  });

  const isError = summaryDataError || summaryData?.message?.includes("Error occured");
  const passedDate = getDateDiff("today", summaryData?.lastUpdatedAt);

  if (isError) {
    return (
      <div className="flex flex-col gap-20 w-full h-full px-15 lg:px-15 py-10 lg:py-15">
        <span className="text-12 font-light text-gray-600">
          최근 업데이트를 불러오는데 실패했습니다. 잠시 후에 다시 시도해주세요.
        </span>
      </div>
    );
  }

  if (summaryDataPending) {
    return null;
  }

  return (
    <div className="flex flex-col gap-20 w-full h-full px-15 lg:px-15 py-10 lg:py-15">
      <div className="flex justify-between items-end">
        <span className="text-20 font-semibold">최근 업데이트</span>
        {passedDate && <span className="text-12 font-light text-gray-500">{passedDate}일 전</span>}
      </div>
      <div className="flex justify-between gap-10">
        <span className="text-15 font-light text-gray-600">그룹</span>
        {summaryData?.group && (
          <span className="text-17 font-medium">
            {summaryData?.group.length > 20
              ? summaryData?.group.substring(0, 19) + "..."
              : summaryData?.group}
          </span>
        )}
      </div>
      <div className="flex justify-between">
        <span className="text-15 font-light text-gray-600">키워드</span>
        <span className="text-15 font-light text-gray-600">게시물 수</span>
      </div>
      <div>
        {summaryData?.postUpdateNewest?.map((keyword) => {
          return (
            <div key={keyword.id} className="flex justify-between">
              <span className="text-15 font-medium">#{keyword.name}</span>
              <span className="text-15 font-medium">{keyword.postCount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupSummary;
