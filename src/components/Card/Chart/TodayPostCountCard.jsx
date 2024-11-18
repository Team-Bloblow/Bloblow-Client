import asyncGetTodayPostCount from "../../../api/keyword/asyncGetTodayPostCount";
import DownwardArrowIcon from "../../Icon/DownwardArrowIcon";
import EndashIcon from "../../Icon/EndashIcon";
import UpwardArrowIcon from "../../Icon/UpwardArrowIcon";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const TodayPostCountCard = ({ keywordId }) => {
  const hasKeywordId = !!keywordId;

  const { data: chartData, isError } = useQuery({
    queryKey: ["todayPostCount", keywordId],
    queryFn: () => asyncGetTodayPostCount(keywordId),
    enabled: hasKeywordId,
  });

  if (chartData === undefined) {
    return null;
  }

  if (isError || chartData?.message?.includes("Error occured")) {
    return (
      <div className="w-1/2 h-full p-10 border-1 rounded-md flex justify-center items-center">
        오늘의 게시물 차트를 불러오는 데 실패했습니다.
      </div>
    );
  }

  const isEqual = Number(chartData?.diffPostCount) === 0;
  const greaterThanYesterday = Number(chartData.diffPostCount) > 0;
  const lessThanYesterday = Number(chartData.diffPostCount) < 0;

  return (
    <article className="flex flex-col w-[30%] p-10 border-1 rounded-md flex-shrink-0">
      <span className="flex justify-between items-center bg-green-100/20 px-10 py-9 rounded-[2px] text-18 font-semibold">
        오늘의 게시물
      </span>
      <div className="flex flex-col justify-center pt-30">
        <div className="flex justify-center">
          {isEqual && <EndashIcon className="size-70" />}
          {greaterThanYesterday && <UpwardArrowIcon className="size-90" />}
          {lessThanYesterday && <DownwardArrowIcon className="size-90" />}
        </div>
        <span className="flex-center text-120">{chartData.todayPostCount}</span>
        <div className="flex justify-center mt-15">
          {isEqual && "어제와 게시물 수가 동일합니다."}
          {greaterThanYesterday &&
            `어제 대비 게시물 수가 ${chartData.diffPostCount}개 증가했습니다.`}
          {lessThanYesterday && `어제 대비 게시물 수가 ${chartData.diffPostCount}개 감소했습니다.`}
        </div>
      </div>
    </article>
  );
};

export default TodayPostCountCard;

TodayPostCountCard.propTypes = {
  keywordId: PropTypes.string.isRequired,
};
