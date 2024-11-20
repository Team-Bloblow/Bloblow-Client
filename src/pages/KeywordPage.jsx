import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import asyncGetUserGroup from "../api/group/asyncGetUserGroup";
import asyncGetKeyword from "../api/keyword/asyncGetKeyword";
import PeriodAdCountCard from "../components/Card/Chart/PeriodAdCountCard";
import PeriodPostCountCard from "../components/Card/Chart/PeriodPostCountCard";
import PeriodReactionCountCard from "../components/Card/Chart/PeriodReactionCountCard";
import TodayPostCountCard from "../components/Card/Chart/TodayPostCountCard";
import PostCardList from "../components/Card/Post/PostCardList";
import DashboardHeader from "../components/Header/DashboardHeader";
import ChartIcon from "../components/Icon/ChartIcon";
import PostIcon from "../components/Icon/PostIcon";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";
import { POST_LISTS } from "../config/constants";
import useNoSignInRedirect from "../hooks/useNoSignInRedirect";
import useBoundStore from "../store/client/useBoundStore";
import { useQuery } from "@tanstack/react-query";

const KeywordPage = () => {
  useNoSignInRedirect();

  const { groupId, keywordId } = useParams();
  const [dashboardType, setDashboardType] = useState("chart");
  const [filterList, setFilterList] = useState(POST_LISTS.DEFAULT_FILTER_LIST);
  const setUserGroupList = useBoundStore((state) => state.setUserGroupList);
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const hasUserUid = !!userUid;
  const hasKeywordId = !!keywordId;
  const resetFilterList = () => {
    setFilterList(POST_LISTS.DEFAULT_FILTER_LIST);
  };

  useEffect(() => {
    if (keywordId !== null && keywordId !== undefined) {
      resetFilterList();
    }
  }, [keywordId]);

  const { data: userGroupList, isError: isUserGroupListError } = useQuery({
    queryKey: ["userGroupList", userUid],
    queryFn: () => asyncGetUserGroup(userUid),
    enabled: hasUserUid,
  });

  const { data: specificKeywordData, isError: isSpecificKeywordDataError } = useQuery({
    queryKey: ["specificKeyword", keywordId],
    queryFn: () => asyncGetKeyword(keywordId),
    enabled: hasKeywordId,
  });

  const isError =
    isUserGroupListError ||
    isSpecificKeywordDataError ||
    userGroupList?.message?.includes("Error occured") ||
    specificKeywordData?.message?.includes("Error occured");

  if (userGroupList?.groupListLength > 0 && userGroupList?.groupListResult?.length > 0) {
    setUserGroupList(userGroupList?.groupListResult);
  }

  if (userGroupList === undefined || specificKeywordData === undefined) {
    return null;
  }

  return (
    <main className="flex justify-start items-start mx-auto pt-67 h-screen w-full max-w-1440">
      <DashboardSidebar userGroupList={userGroupList?.groupListResult} groupId={groupId} />
      <section
        className={`w-full flex flex-col justify-start ${dashboardType !== "chart" && "h-full"}`}
      >
        <DashboardHeader
          userGroupList={userGroupList?.groupListResult}
          groupId={groupId}
          specificKeywordData={specificKeywordData}
          keywordId={keywordId}
        />
        <article
          className={`flex flex-col border-l-1 border-b-2 border-r-2 border-slate-200/80 w-full ${dashboardType !== "chart" && "h-full"}`}
        >
          <div className="flex gap-10 w-full h-44 bg-gray-100 border-x-1">
            <button
              className={`flex w-full gap-5 py-5 h-44 items-center justify-center ${dashboardType === "chart" ? "bg-white font-bold border-t-2 border-gray-500" : "text-gray-500"} hover:font-bold hover:text-gray-800`}
              onClick={() => setDashboardType("chart")}
            >
              <ChartIcon className="w-20 h-20" />
              대시보드
            </button>
            <button
              className={`flex w-full gap-5 py-5 h-44 items-center justify-center ${dashboardType === "post" ? "bg-white font-bold border-t-2 border-gray-500" : "text-gray-500"} hover:font-bold hover:text-gray-800`}
              onClick={() => setDashboardType("post")}
            >
              <PostIcon className="w-20 h-20" />
              게시물 목록
            </button>
          </div>
          {isError ? (
            <div className="flex flex-center w-full h-full">
              에러가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다.
            </div>
          ) : (
            <>
              {dashboardType === "chart" ? (
                <div className="flex flex-col gap-10 p-10 w-full h-full">
                  <div className="flex gap-10 w-full h-full">
                    <TodayPostCountCard keywordId={keywordId} />
                    <PeriodPostCountCard keywordId={keywordId} />
                  </div>
                  <div className="flex gap-10 w-full h-full">
                    <PeriodAdCountCard keywordId={keywordId} />
                    <PeriodReactionCountCard keywordId={keywordId} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <PostCardList
                    keywordId={keywordId}
                    filterList={filterList}
                    setFilterList={setFilterList}
                    resetFilterList={resetFilterList}
                  />
                </div>
              )}
            </>
          )}
        </article>
      </section>
    </main>
  );
};

export default KeywordPage;
