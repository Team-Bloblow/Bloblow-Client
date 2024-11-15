import asyncGetTodayPostCount from "../../../api/keyword/asyncGetTodayPostCount";
import DownwardArrowIcon from "../../Icon/DownwardArrowIcon";
import EndashIcon from "../../Icon/EndashIcon";
import UpwardArrowIcon from "../../Icon/UpwardArrowIcon";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const TodayPostCountCard = ({ keywordId }) => {
  const { data: chartData, isError } = useQuery({
    queryKey: ["todayPostCount", keywordId],
    queryFn: () => asyncGetTodayPostCount(keywordId),
  });

  if (chartData === undefined) {
    return null;
  }

  if (isError || chartData?.message?.includes("Error occured")) {
    return (
      <div className="w-1/2 h-full p-10 border-2 rounded-md flex justify-center items-center">
        오늘의 게시물 차트를 불러오는 데 실패했습니다.
      </div>
    );
  }

  const isEqual = Number(chartData?.diffPostCount) === 0;
  const greaterThanYesterday = Number(chartData.diffPostCount) > 0;
  const lessThanYesterday = Number(chartData.diffPostCount) < 0;

  return (
    <article className="flex flex-col gap-40 w-[35%] h-full p-10 border-2 rounded-md flex-shrink-0">
      <span className="bg-green-100/20 px-10 py-5 rounded-[2px]">오늘의 게시물</span>
      <div className="flex flex-col gap-10 h-full">
        <p className="flex justify-center">
          {isEqual && <EndashIcon className="size-90" />}
          {greaterThanYesterday && <UpwardArrowIcon className="size-90" />}
          {lessThanYesterday && <DownwardArrowIcon className="size-90" />}
          <p className="text-50 justify-center items-center pt-8">
            {!isEqual && chartData.diffPostCount}
          </p>
        </p>
        <span className="flex-center text-120">{chartData.todayPostCount}</span>
      </div>
    </article>
  );
};

export default TodayPostCountCard;

TodayPostCountCard.propTypes = {
  keywordId: PropTypes.string.isRequired,
};
