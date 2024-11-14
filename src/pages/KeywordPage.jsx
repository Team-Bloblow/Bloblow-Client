import { useState } from "react";
import { useParams } from "react-router-dom";

import asyncGetUserGroup from "../api/group/asyncGetUserGroup";
import asyncGetKeyword from "../api/keyword/asyncGetKeyword";
import PeriodPostCommentCard from "../components/Card/Chart/PeriodPostCommentCard";
import PeriodPostCountCard from "../components/Card/Chart/PeriodPostCountCard";
import PeriodPostLikeCard from "../components/Card/Chart/PeriodPostLikeCard";
import TodayPostCountCard from "../components/Card/Chart/TodayPostCountCard";
import PostCardList from "../components/Card/Post/PostCardList";
import PostListFilter from "../components/Card/Post/PostListFilter";
import DashboardHeader from "../components/Header/DashboardHeader";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";
import useNoSignInRedirect from "../hooks/useNoSignInRedirect";
import useBoundStore from "../store/client/useBoundStore";
import { useQuery } from "@tanstack/react-query";

const KeywordPage = () => {
  useNoSignInRedirect();

  const { groupId, keywordId } = useParams();
  const [dashboardType, setDashboardType] = useState("chart");
  const [filterList, setFilterList] = useState({
    includedKeyword: [],
    excludedKeyword: [],
  });

  const setUserGroupList = useBoundStore((state) => state.setUserGroupList);
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const hasUserUid = !!userUid;
  const hasKeywordId = !!keywordId;

  const { data: userGroupList, isError: isUserGroupListError } = useQuery({
    queryKey: ["userGroupList"],
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
      <section className="w-full h-full flex flex-col justify-start">
        <DashboardHeader
          userGroupList={userGroupList?.groupListResult}
          groupId={groupId}
          specificKeywordData={specificKeywordData}
          keywordId={keywordId}
        />
        <article className="flex flex-col border-r-2 border-slate-200/80 shadow-sm h-full">
          <div className="flex gap-10 w-full h-40 px-10 bg-green-100/30">
            <button
              className={`p-5 h-full ${dashboardType === "chart" ? "font-bold" : "text-gray-500"} hover:text-green-800`}
              onClick={() => setDashboardType("chart")}
            >
              인사이트 보기
            </button>
            <button
              className={`p-5 h-full ${dashboardType === "post" ? "font-bold" : "text-gray-500"} hover:text-green-800`}
              onClick={() => setDashboardType("post")}
            >
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
                <div className="flex flex-col p-10 w-full h-full">
                  <div className="flex gap-10 w-full">
                    <TodayPostCountCard keywordId={keywordId} />
                    <PeriodPostCountCard keywordId={keywordId} />
                  </div>
                  <div className="flex gap-10 w-full">
                    <PeriodPostLikeCard keywordId={keywordId} />
                    <PeriodPostCommentCard keywordId={keywordId} />
                  </div>
                </div>
              ) : (
                <>
                  <PostListFilter filterList={filterList} setFilterList={setFilterList} />
                  <PostCardList keywordId={keywordId} filterList={filterList} />
                </>
              )}
            </>
          )}
        </article>
      </section>
    </main>
  );
};

export default KeywordPage;
