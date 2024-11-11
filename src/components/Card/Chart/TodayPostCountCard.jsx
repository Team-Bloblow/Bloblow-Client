import asyncGetTodayPostCount from "../../../api/keyword/asyncGetTodayPostCount";
import DownArrowIcon from "../../Icon/DownArrowIcon";
import UpArrowIcon from "../../Icon/UpArrowIcon";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const TodayPostCountCard = ({ keywordId }) => {
  const { data: todayPostData } = useQuery({
    queryKey: ["todayPostCount", keywordId],
    queryFn: () => asyncGetTodayPostCount(keywordId),
  });

  if (typeof todayPostData === "undefined") {
    return <div className="mt-100 w-1/3 p-10">조회된 게시물이 없습니다 🥲</div>;
  }

  return (
    <article className="mt-100 w-1/3 p-10">
      <span>오늘의 게시물</span>
      <p>
        어제보다 게시물 수 {Math.abs(todayPostData.diffPostCount)}개{" "}
        {todayPostData.diffPostCount >= 0 ? "증가" : "감소"}
      </p>
      <div className="flex">
        <div className="text-50">{todayPostData.todayPostCount}</div>
        <div className="flex">
          {todayPostData.diffPostCount >= 0 ? <UpArrowIcon /> : <DownArrowIcon />}
          {todayPostData.diffPercent}%
        </div>
      </div>
    </article>
  );
};

export default TodayPostCountCard;

TodayPostCountCard.propTypes = {
  keywordId: PropTypes.string,
};
