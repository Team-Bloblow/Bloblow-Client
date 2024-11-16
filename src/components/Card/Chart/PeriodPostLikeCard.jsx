import { useState } from "react";

import asyncGetPostLikeList from "../../../api/keyword/asyncGetPostLikeList";
import { getCursorDate } from "../../../utils/date";
import LineChart from "../../Chart/LineChart";
import PeriodPagination from "../../Pagination/PeriodPagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const PeriodPostLikeCard = ({ keywordId }) => {
  const [cursorId, setCursorId] = useState(() => getCursorDate());

  const {
    data: chartData,
    isPlaceholderData,
    isError,
  } = useQuery({
    queryKey: ["postLike", keywordId, cursorId],
    queryFn: () => asyncGetPostLikeList(keywordId, cursorId),
    select: (data) => ({ ...data, items: data.postLikeList }),
    placeholderData: keepPreviousData,
  });

  if (chartData === undefined) {
    return null;
  }

  if (isError || chartData?.message?.includes("Error occured")) {
    return (
      <div className="w-1/2 h-full p-10 border-2 rounded-md flex justify-center items-center">
        주간 공감 수 차트를 불러오는 데 실패했습니다.
      </div>
    );
  }

  return (
    <article className="flex flex-col gap-6 w-1/2 p-10 border-2 rounded-md">
      <span className="flex-shrink-0 bg-green-100/20 px-10 py-5 rounded-[2px]">주간 공감 수</span>
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

export default PeriodPostLikeCard;

PeriodPostLikeCard.propTypes = {
  keywordId: PropTypes.string.isRequired,
};
