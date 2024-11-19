import { useState } from "react";

import asyncGetReactionCountList from "../../../api/keyword/asyncGetReactionCountList";
import { PERIOD_TYPE } from "../../../config/constants";
import PeriodToggleButton from "../../Button/PeriodToggleButton";
import MultiTypeChart from "../../Chart/MultiTypeChart";
import PeriodPagination from "../../Pagination/PeriodPagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const PeriodReactionCountCard = ({ keywordId }) => {
  const [cursorId, setCursorId] = useState("");
  const [period, setPeriod] = useState(PERIOD_TYPE.WEEKLY);
  const hasKeywordId = !!keywordId;

  const {
    data: chartData,
    isPlaceholderData,
    isError,
    isPending: isChartDataPending,
  } = useQuery({
    queryKey: ["reactionCount", keywordId, period, cursorId],
    queryFn: () => asyncGetReactionCountList(keywordId, cursorId, period),
    enabled: hasKeywordId,
    placeholderData: keepPreviousData,
  });

  if (isError || chartData?.message?.includes("Error occured")) {
    return (
      <div className="flex flex-col gap-6 w-1/2 h-full p-10 border-1 rounded-md justify-center items-center">
        주간 게시물 반응수 차트를 불러오는 데 실패했습니다.
      </div>
    );
  }

  if (isChartDataPending && cursorId === "") {
    return (
      <article className="flex flex-col gap-6 w-1/2 p-10 border-2 rounded-md">
        <span className="flex-shrink-0 bg-green-100/20 px-10 py-5 rounded-[2px]">
          게시물 반응수
        </span>
        <div className="flex-col-center gap-5 animate-pulse">
          <div className="flex-shrink-0 w-full aspect-[2] bg-slate-200/60" />
          <div className="w-235 h-35 bg-slate-200/60" />
        </div>
      </article>
    );
  }

  if (chartData === undefined) {
    return null;
  }

  return (
    <article className="flex flex-col gap-6 w-1/2 h-full p-10 border-1 rounded-md">
      <div className="flex justify-between items-center flex-shrink-0 px-10 py-5 rounded-[2px]">
        <span className="flex items-center text-20 font-semibold">게시물 반응수 추이</span>
        <PeriodToggleButton
          keywordId={keywordId}
          period={period}
          setPeriod={setPeriod}
          setCursorId={setCursorId}
        />
      </div>
      <div className="flex-col-center gap-5">
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
