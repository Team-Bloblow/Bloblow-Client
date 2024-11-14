import asyncGetTodayPostCount from "../../../api/keyword/asyncGetTodayPostCount";
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

  return (
    <article className="w-1/2 h-full p-10 border-2 rounded-md">
      <span>오늘의 게시물</span>
      <p className="flex justify-center mt-20">
        {Number(chartData.diffPostCount) === 0 ? (
          "어제와 게시물 수가 동일합니다."
        ) : (
          <>
            어제 대비 게시물 수 {Math.abs(chartData.diffPostCount)}개{" "}
            {Number(chartData.diffPostCount) >= 0 ? "증가" : "감소"}
          </>
        )}
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
