import asyncGetTodayPostCount from "../../../api/keyword/asyncGetTodayPostCount";
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
    <article className="w-1/2 h-full p-10 border-2 rounded-md">
      <span>오늘의 게시물</span>
      <p className="flex justify-center mt-20">
        어제대비 게시물 수 {Math.abs(chartData.diffPostCount)}개{" "}
        {chartData.diffPostCount >= 0 ? "증가" : "감소"}
      </p>
      <div className="flex justify-center">
        <div className="text-50">{chartData.todayPostCount}</div>
      </div>
    </article>
  );
};

export default TodayPostCountCard;

TodayPostCountCard.propTypes = {
  keywordId: PropTypes.string.isRequired,
};
