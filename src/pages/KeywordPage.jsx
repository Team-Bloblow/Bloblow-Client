import { useState } from "react";
import { useParams } from "react-router-dom";

import PeriodPostCountCard from "../components/Card/Chart/PeriodPostCountCard";
import TodayPostCountCard from "../components/Card/Chart/TodayPostCountCard";
import PostCardList from "../components/Card/Post/PostCardList";
import DashboardHeader from "../components/Header/DashboardHeader";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";

const KeywordPage = () => {
  const [dashboardType] = useState("chart");
  // useNoSignInRedirect();
  const { keywordId } = useParams();

  return (
    <main className="flex justify-start items-start mx-auto pt-67 h-screen w-full max-w-1440">
      <DashboardSidebar />
      <section className="w-full h-full flex flex-col justify-start">
        <DashboardHeader />
        {dashboardType === "chart" ? (
          <div className="flex p-20">
            <TodayPostCountCard keywordId={keywordId} />
            <PeriodPostCountCard keywordId={keywordId} />
          </div>
        ) : (
          <PostCardList />
        )}
      </section>
    </main>
  );
};

export default KeywordPage;
