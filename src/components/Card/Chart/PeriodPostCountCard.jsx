import { useState } from "react";

import asyncGetPostCountList from "../../../api/keyword/asyncGetPostCountList";
import { PERIOD_TYPE } from "../../../config/constants";
import { setDateArray } from "../../../utils/date";
import LineChart from "../../Chart/LineChart";
import PeriodPagination from "../../Pagination/PeriodPagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const PeriodPostCountCard = ({ keywordId }) => {
  const [cursorId, setCursorId] = useState(new Date().toISOString());

  const { data: chartData, isPlaceholderData } = useQuery({
    queryKey: ["postCount", keywordId, cursorId],
    queryFn: () => asyncGetPostCountList(keywordId, cursorId, PERIOD_TYPE.WEEKLY),
    select: (data) => ({ ...data, dates: setDateArray(data.cursorId) }),
    placeholderData: keepPreviousData,
  });

  if (typeof chartData === "undefined") {
    return <div className="mt-100 w-1/3 p-10">조회된 주간 게시물이 없습니다 🥲</div>;
  }

  return (
    <div className="mt-100 w-1/3 p-10">
      <span>주간 게시물 수</span>
      <LineChart chartData={chartData} />
      <PeriodPagination
        chartData={chartData}
        setCursorId={setCursorId}
        isPlaceholderData={isPlaceholderData}
      />
    </div>
  );
};

export default PeriodPostCountCard;

PeriodPostCountCard.propTypes = {
  keywordId: PropTypes.string.isRequired,
};
