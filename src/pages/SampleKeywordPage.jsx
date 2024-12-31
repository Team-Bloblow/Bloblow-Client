import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import asyncGetSpecificGroup from "../api/group/asyncGetSpecificGroup";
import asyncGetKeyword from "../api/keyword/asyncGetKeyword";
import PeriodAdCountCard from "../components/Card/Chart/PeriodAdCountCard";
import PeriodPostCountCard from "../components/Card/Chart/PeriodPostCountCard";
import PeriodReactionCountCard from "../components/Card/Chart/PeriodReactionCountCard";
import TodayPostCountCard from "../components/Card/Chart/TodayPostCountCard";
import PostCardList from "../components/Card/Post/PostCardList";
import SampleDashboardHeader from "../components/Header/SampleDashboardHeader";
import ChartIcon from "../components/Icon/ChartIcon";
import PostIcon from "../components/Icon/PostIcon";
import SampleDashboardSidebar from "../components/Sidebar/SampleDashboardSidebar";
import { POST_LISTS } from "../config/constants";
import useSignInRedirect from "../hooks/useSignInRedirect";
import { useQuery } from "@tanstack/react-query";

const SampleKeywordPage = () => {
  useSignInRedirect();

  const pathname = useLocation().pathname;

  const groupId = import.meta.env.VITE_SAMPLE_GROUP_ID;
  const keywordId =
    pathname === "/dashboard/sample/keyword-one"
      ? import.meta.env.VITE_SAMPLE_KEYWORD_ONE_ID
      : pathname === "/dashboard/sample/keyword-two"
        ? import.meta.env.VITE_SAMPLE_KEYWORD_TWO_ID
        : null;

  const [dashboardType, setDashboardType] = useState("chart");
  const [filterList, setFilterList] = useState(POST_LISTS.DEFAULT_FILTER_LIST);
  const hasKeywordId = !!keywordId;
  const resetFilterList = () => {
    setFilterList(POST_LISTS.DEFAULT_FILTER_LIST);
  };

  useEffect(() => {
    if (keywordId !== null && keywordId !== undefined) {
      setDashboardType("chart");
      resetFilterList();
    }
  }, [keywordId]);

  const { data: sampleGroupData, isError: isUserGroupListError } = useQuery({
    queryKey: ["sampleGroupData"],
    queryFn: () => asyncGetSpecificGroup(groupId),
  });

  const { data: specificKeywordData, isError: isSpecificKeywordDataError } = useQuery({
    queryKey: ["specificSampleKeyword", keywordId],
    queryFn: () => asyncGetKeyword(keywordId),
    enabled: hasKeywordId,
  });

  const groupName = sampleGroupData?.name;
  const keywordList = sampleGroupData?.keywordIdList;

  const isError =
    isUserGroupListError ||
    isSpecificKeywordDataError ||
    sampleGroupData?.message?.includes("Error occured") ||
    specificKeywordData?.message?.includes("Error occured");

  if (sampleGroupData === undefined || specificKeywordData === undefined) {
    return null;
  }

  return (
    <main className="flex flex-col md:flex-row justify-start items-stretch mx-auto pt-67 w-full h-full max-w-1440">
      <SampleDashboardSidebar
        groupName={groupName}
        keywordList={keywordList}
        keywordId={keywordId}
      />
      <section
        className={`w-full flex flex-col justify-start ${dashboardType !== "chart" && "h-full"}`}
      >
        <SampleDashboardHeader
          groupName={groupName}
          keywordList={keywordList}
          specificKeywordData={specificKeywordData}
          keywordId={keywordId}
        />
        <article
          className={`flex flex-col border-l-1 border-b-2 border-r-2 border-slate-200/80 shadow-md w-full ${dashboardType !== "chart" && "h-full"}`}
        >
          <div className="flex gap-10 w-full h-44 bg-gray-100 border-x-1">
            <button
              className={`flex w-full gap-5 py-5 h-44 items-center justify-center md:text-16 text-14 ${dashboardType === "chart" ? "bg-white font-bold border-t-2 border-gray-500" : "text-gray-500"} hover:font-bold hover:text-gray-800`}
              onClick={() => setDashboardType("chart")}
            >
              <ChartIcon className="md:size-20 size-16" />
              대시보드
            </button>
            <button
              className={`flex w-full gap-5 py-5 h-44 items-center justify-center md:text-16 text-14 ${dashboardType === "post" ? "bg-white font-bold border-t-2 border-gray-500" : "text-gray-500"} hover:font-bold hover:text-gray-800`}
              onClick={() => setDashboardType("post")}
            >
              <PostIcon className="md:size-20 size-16" />
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
                  <div className="flex md:flex-row flex-col gap-10 w-full h-full">
                    <TodayPostCountCard keywordId={keywordId} />
                    <PeriodPostCountCard keywordId={keywordId} />
                  </div>
                  <div className="flex md:flex-row flex-col gap-10 w-full h-full">
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

export default SampleKeywordPage;
