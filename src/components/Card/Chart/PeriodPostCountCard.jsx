import { useState } from "react";

import asyncGetPostCountList from "../../../api/keyword/asyncGetPostCountList";
import { PERIOD_TYPE } from "../../../config/constants";
import PeriodToggleButton from "../../Button/PeriodToggleButton";
import LineChart from "../../Chart/LineChart";
import PeriodPagination from "../../Pagination/PeriodPagination";
import ChartSkeleton from "../../UI/ChartSkeleton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const PeriodPostCountCard = ({ keywordId }) => {
  const [cursorId, setCursorId] = useState("");
  const [period, setPeriod] = useState(PERIOD_TYPE.WEEKLY);
  const hasKeywordId = !!keywordId;

  const {
    data: chartData,
    isPlaceholderData,
    isError,
    isPending: isChartDataPending,
  } = useQuery({
    queryKey: ["postCount", keywordId, period, cursorId],
    queryFn: () => asyncGetPostCountList(keywordId, cursorId, period),
    select: (data) => ({ ...data, items: data.postCountList }),
    enabled: hasKeywordId,
    placeholderData: keepPreviousData,
  });

  if (isError || chartData?.message?.includes("Error occured")) {
    return (
      <div className="flex flex-col gap-6 w-full p-10 border-1 rounded-md justify-center items-center">
        주간 게시물 차트를 불러오는 데 실패했습니다.
      </div>
    );
  }

  if (isChartDataPending && cursorId === "") {
    return (
      <ChartSkeleton
        containerStyle="flex flex-col gap-6 w-full p-10 border-2 rounded-md"
        chartTitle="게시물 수"
        chartAspect="13/5"
      />
    );
  }

  if (chartData === undefined) {
    return null;
  }

  return (
    <article className="flex flex-col gap-6 w-full p-10 border-1 rounded-md">
      <div className="flex justify-between items-center flex-shrink-0 px-10 py-5 rounded-[2px]">
        <span className="flex items-center text-16 md:text-20 font-semibold">게시물 수 추이</span>
        <PeriodToggleButton
          keywordId={keywordId}
          period={period}
          setPeriod={setPeriod}
          setCursorId={setCursorId}
        />
      </div>
      <div className="flex-col-center">
        <LineChart chartData={chartData} />
        <PeriodPagination
          chartData={chartData}
          setCursorId={setCursorId}
          isPlaceholderData={isPlaceholderData}
        />
      </div>
    </article>
  );
};

export default PeriodPostCountCard;

PeriodPostCountCard.propTypes = {
  keywordId: PropTypes.string.isRequired,
};
