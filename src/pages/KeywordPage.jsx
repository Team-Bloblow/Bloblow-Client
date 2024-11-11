import PostCardList from "../components/Card/Post/PostCardList";
import DashboardHeader from "../components/Header/DashboardHeader";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";
import { useParams } from "react-router-dom";

import PeriodPostCountCard from "../components/Card/Chart/PeriodPostCountCard";
import TodayPostCountCard from "../components/Card/Chart/TodayPostCountCard";

const KeywordPage = () => {
  // useNoSignInRedirect();
  const { keywordId } = useParams();

  return (
    <main className="flex justify-start items-start mx-auto pt-67 h-screen w-full max-w-1440">
      <DashboardSidebar />
      <section className="w-full h-full flex flex-col justify-start">
        <DashboardHeader />
        <PostCardList />
        <TodayPostCountCard keywordId={keywordId} />
        <PeriodPostCountCard keywordId={keywordId} />
      </section>
    </main>
  );
};

export default KeywordPage;
