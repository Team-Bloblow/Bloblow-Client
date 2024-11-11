import asyncGetTodayPostCount from "../../../api/keyword/asyncGetTodayPostCount";
import DownArrowIcon from "../../Icon/DownArrowIcon";
import UpArrowIcon from "../../Icon/UpArrowIcon";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const TodayPostCountCard = ({ keywordId }) => {
  const { data: chartData } = useQuery({
    queryKey: ["todayPostCount", keywordId],
    queryFn: () => asyncGetTodayPostCount(keywordId),
  });

  if (typeof chartData === "undefined") {
    return <div className="mt-100 w-1/3 p-10">조회된 게시물이 없습니다 🥲</div>;
  }

  return (
    <article className="mt-100 w-1/3 p-10">
      <span>오늘의 게시물</span>
      <p>
        어제보다 게시물 수 {Math.abs(chartData.diffPostCount)}개{" "}
        {chartData.diffPostCount >= 0 ? "증가" : "감소"}
      </p>
      <div className="flex">
        <div className="text-50">{chartData.todayPostCount}</div>
        <div className="flex">
          {chartData.diffPostCount >= 0 ? <UpArrowIcon /> : <DownArrowIcon />}
          {chartData.diffPercent}%
        </div>
      </div>
    </article>
  );
};

export default TodayPostCountCard;

TodayPostCountCard.propTypes = {
  keywordId: PropTypes.string,
};
