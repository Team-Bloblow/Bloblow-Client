import { useState } from "react";

import asyncGetReactionCountList from "../../../api/keyword/asyncGetReactionCountList";
import MultiTypeChart from "../../Chart/MultiTypeChart";
import PeriodPagination from "../../Pagination/PeriodPagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const PeriodReactionCountCard = ({ keywordId }) => {
  const [cursorId, setCursorId] = useState("");

  const {
    data: chartData,
    isPlaceholderData,
    isError,
  } = useQuery({
    queryKey: ["reactionCount", keywordId, cursorId],
    queryFn: () => asyncGetReactionCountList(keywordId, cursorId),
    placeholderData: keepPreviousData,
  });

  if (chartData === undefined) {
    return null;
  }

  if (isError || chartData?.message?.includes("Error occured")) {
    return (
      <div className="flex flex-col gap-6 w-1/2 h-full p-10 border-2 rounded-md justify-center items-center">
        주간 게시물 반응수 차트를 불러오는 데 실패했습니다.
      </div>
    );
  }

  return (
    <article className="flex flex-col gap-6 w-1/2 h-full p-10 border-2 rounded-md">
      <span className="flex-shrink-0 bg-green-100/20 px-10 py-5 rounded-[2px]">게시물 반응수</span>
      <div className="flex-col-center">
        <MultiTypeChart chartData={chartData} />
        <PeriodPagination
          chartData={chartData}
          setCursorId={setCursorId}
          isPlaceholderData={isPlaceholderData}
        />
      </div>
    </article>
  );
};

export default PeriodReactionCountCard;

PeriodReactionCountCard.propTypes = {
  keywordId: PropTypes.string.isRequired,
};
