import { useState } from "react";
import { useParams } from "react-router-dom";

import asyncGetUserGroup from "../api/group/asyncGetUserGroup";
import asyncGetKeyword from "../api/keyword/asyncGetKeyword";
import PeriodPostCountCard from "../components/Card/Chart/PeriodPostCountCard";
import TodayPostCountCard from "../components/Card/Chart/TodayPostCountCard";
import PostCardList from "../components/Card/Post/PostCardList";
import DashboardHeader from "../components/Header/DashboardHeader";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";
import useNoSignInRedirect from "../hooks/useNoSignInRedirect";
import useBoundStore from "../store/client/useBoundStore";
import { useQuery } from "@tanstack/react-query";

const KeywordPage = () => {
  useNoSignInRedirect();

  const { groupId, keywordId } = useParams();
  const [dashboardType, setDashboardType] = useState("chart");

  const setUserGroupList = useBoundStore((state) => state.setUserGroupList);
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const hasUserUid = !!userUid;
  const hasKeywordId = !!keywordId;

  const { data: userGroupList } = useQuery({
    queryKey: ["userGroupList"],
    queryFn: () => asyncGetUserGroup(userUid),
    enabled: hasUserUid,
  });

  const { data: specificKeywordData } = useQuery({
    queryKey: ["specificKeyword", keywordId],
    queryFn: () => asyncGetKeyword(keywordId),
    enabled: hasKeywordId,
  });

  if (userGroupList?.groupListResult > 0 && userGroupList?.groupListResult?.length > 0) {
    setUserGroupList(userGroupList?.groupListResult);
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
        <div className="w-full m-10">
          <button
            className="p-5 border-1 border-slate-300"
            onClick={() => setDashboardType("chart")}
          >
            인사이트 보기
          </button>
          <button
            className="p-5 border-1 border-slate-300"
            onClick={() => setDashboardType("post")}
          >
            게시물 목록
          </button>
        </div>
        {dashboardType === "chart" ? (
          <div className="flex p-20">
            <TodayPostCountCard keywordId={keywordId} />
            <PeriodPostCountCard keywordId={keywordId} />
          </div>
        ) : (
          <PostCardList keywordId={keywordId} />
        )}
      </section>
    </main>
  );
};

export default KeywordPage;
