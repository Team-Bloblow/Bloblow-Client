import asyncGetTodayPostCount from "../../../api/keyword/asyncGetTodayPostCount";
import DownwardArrowIcon from "../../Icon/DownwardArrowIcon";
import EndashIcon from "../../Icon/EndashIcon";
import UpwardArrowIcon from "../../Icon/UpwardArrowIcon";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const TodayPostCountCard = ({ keywordId }) => {
  const hasKeywordId = !!keywordId;

  const {
    data: chartData,
    isError,
    isPending: isChartDataPending,
  } = useQuery({
    queryKey: ["todayPostCount", keywordId],
    queryFn: () => asyncGetTodayPostCount(keywordId),
    enabled: hasKeywordId,
  });

  if (isError || chartData?.message?.includes("Error occured")) {
    return (
      <div className="w-1/2 h-full p-10 border-1 rounded-md flex justify-center items-center">
        오늘의 게시물 차트를 불러오는 데 실패했습니다.
      </div>
    );
  }

  if (isChartDataPending) {
    return (
      <article className="flex flex-col w-[30%] gap-6 p-10 border-2 rounded-md flex-shrink-0">
        <span className="flex-shrink-0 bg-green-100/20 px-10 py-5 rounded-[2px]">
          오늘의 게시물
        </span>
        <div className="w-full h-full animate-pulse bg-slate-200/60" />
      </article>
    );
  }

  if (chartData === undefined) {
    return null;
  }

  const isEqual = Number(chartData?.diffPostCount) === 0;
  const greaterThanYesterday = Number(chartData.diffPostCount) > 0;
  const lessThanYesterday = Number(chartData.diffPostCount) < 0;
  const absOfDiffPostCount = Math.abs(parseInt(chartData.diffPostCount));

  return (
    <article className="flex flex-col w-[30%] p-10 border-1 rounded-md flex-shrink-0">
      <div className="flex justify-between items-center flex-shrink-0 px-10 py-7 rounded-[2px]">
        <span className="flex items-center text-20 font-semibold">오늘의 게시물 수</span>
      </div>
      <div className="flex flex-col justify-center pt-10">
        <div className="flex justify-center items-center">
          {isEqual && <EndashIcon className="size-60" />}
          {greaterThanYesterday && (
            <>
              <UpwardArrowIcon className="size-60" />
              <span className="text-35">{"+" + chartData.diffPostCount}</span>
            </>
          )}
          {lessThanYesterday && (
            <>
              <DownwardArrowIcon className="size-60" />
              <span className="text-35">{chartData.diffPostCount}</span>
            </>
          )}
        </div>
        <span className="flex-center text-100 text-gray-800 font-light">
          {chartData.todayPostCount}
        </span>
        <div className="flex justify-center mt-15">
          {isEqual && "어제와 게시물 수가 동일합니다."}
          {greaterThanYesterday &&
            `어제 대비 게시물 수가 ${chartData.diffPostCount}개 증가했습니다.`}
          {lessThanYesterday && `어제 대비 게시물 수가 ${absOfDiffPostCount}개 감소했습니다.`}
        </div>
      </div>
    </article>
  );
};

export default TodayPostCountCard;

TodayPostCountCard.propTypes = {
  keywordId: PropTypes.string.isRequired,
};
