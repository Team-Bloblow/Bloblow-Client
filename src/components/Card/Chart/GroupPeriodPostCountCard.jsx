import { useState } from "react";

import asyncGetGroupCommentCountList from "../../../api/group/asyncGetGroupCommentCountList";
import asyncGetGroupLikeCountList from "../../../api/group/asyncGetGroupLikeCountList";
import asyncGetGroupPostCountList from "../../../api/group/asyncGetGroupPostCountList";
import { GROUP_CHART_TYPE } from "../../../config/constants";
import GroupLineChart from "../../Chart/GroupLineChart";
import GroupPeriodPagination from "../../Pagination/GroupPeriodPagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const GroupPeriodPostCountCard = ({ groupChartType, groupId, hasUserUid }) => {
  const [cursorId, setCursorId] = useState("");

  const hasGroupId = !!groupId;
  let queryFunction;

  switch (groupChartType) {
    case GROUP_CHART_TYPE.POST:
      queryFunction = asyncGetGroupPostCountList;
      break;
    case GROUP_CHART_TYPE.LIKE:
      queryFunction = asyncGetGroupLikeCountList;
      break;
    case GROUP_CHART_TYPE.COMMENT:
      queryFunction = asyncGetGroupCommentCountList;
      break;
  }

  const {
    data: groupPostCountData,
    isError: isGroupPostCountDataError,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["groupPostCount", cursorId, groupId, groupChartType],
    queryFn: () => queryFunction(cursorId, groupId),
    placeholderData: keepPreviousData,
    enabled: hasUserUid && hasGroupId,
    staleTime: 5 * 1000,
  });

  const isError =
    isGroupPostCountDataError || groupPostCountData?.message?.includes("Error occured");

  if (isError) {
    return (
      <article className="flex-col-center w-full h-full border-2 rounded-md">
        에러가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다.
      </article>
    );
  }

  if (groupPostCountData === undefined) {
    return null;
  }

  return (
    <article
      className={`flex flex-col gap-6 h-full p-10 border-2 rounded-md ${groupChartType === GROUP_CHART_TYPE.POST ? "w-full" : "w-1/2"}`}
    >
      <span className="flex-shrink-0 bg-green-100/20 px-10 py-5 rounded-[2px]">
        {groupChartType}
      </span>
      <div className="flex-col-center h-full gap-5">
        <GroupLineChart groupChartType={groupChartType} chartData={groupPostCountData} />
        <GroupPeriodPagination
          chartData={groupPostCountData}
          setCursorId={setCursorId}
          isPlaceholderData={isPlaceholderData}
        />
      </div>
    </article>
  );
};

export default GroupPeriodPostCountCard;

GroupPeriodPostCountCard.propTypes = {
  groupChartType: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  hasUserUid: PropTypes.bool.isRequired,
};
