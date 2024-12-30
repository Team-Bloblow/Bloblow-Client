import { useState } from "react";

import asyncGetAdCountList from "../../../api/keyword/asyncGetAdCountList";
import { PERIOD_TYPE } from "../../../config/constants";
import PeriodToggleButton from "../../Button/PeriodToggleButton";
import StackBarChart from "../../Chart/StackBarChart";
import PeriodPagination from "../../Pagination/PeriodPagination";
import ChartSkeleton from "../../UI/ChartSkeleton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const PeriodAdCountCard = ({ keywordId }) => {
  const [cursorId, setCursorId] = useState("");
  const [period, setPeriod] = useState(PERIOD_TYPE.WEEKLY);
  const hasKeywordId = !!keywordId;

  const {
    data: chartData,
    isPlaceholderData,
    isError,
    isPending: isChartDataPending,
  } = useQuery({
    queryKey: ["adCount", keywordId, period, cursorId],
    queryFn: () => asyncGetAdCountList(keywordId, cursorId, period),
    enabled: hasKeywordId,
    placeholderData: keepPreviousData,
  });

  if (isError || chartData?.message?.includes("Error occured")) {
    return (
      <div className="flex flex-col gap-6 md:w-1/2 w-full h-full p-10 border-1 rounded-md justify-center items-center">
        광고성 게시물 구분 차트를 불러오는 데 실패했습니다.
      </div>
    );
  }

  if (isChartDataPending && cursorId === "") {
    return (
      <ChartSkeleton
        containerStyle="flex flex-col gap-6 md:w-1/2 w-full p-10 border-2 rounded-md"
        chartTitle="광고성 게시물 구분"
        chartAspect="2"
      />
    );
  }

  if (chartData === undefined) {
    return null;
  }

  return (
    <article className="flex flex-col gap-6 md:w-1/2 w-full h-full p-10 border-1 rounded-md">
      <div className="flex justify-between items-center flex-shrink-0 px-10 py-5 rounded-[2px]">
        <span className="flex items-center text-16 md:text-20 font-semibold">
          광고성 게시물 비율
        </span>
        <PeriodToggleButton
          keywordId={keywordId}
          period={period}
          setPeriod={setPeriod}
          setCursorId={setCursorId}
        />
      </div>
      <div className="flex-col-center gap-5">
        <StackBarChart chartData={chartData} />
        <PeriodPagination
          chartData={chartData}
          setCursorId={setCursorId}
          isPlaceholderData={isPlaceholderData}
        />
      </div>
    </article>
  );
};

export default PeriodAdCountCard;

PeriodAdCountCard.propTypes = {
  keywordId: PropTypes.string.isRequired,
};
