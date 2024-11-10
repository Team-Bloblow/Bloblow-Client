import { Outlet } from "react-router-dom";

import PostCardList from "../components/Card/Post/PostCardList";
import DashboardHeader from "../components/Header/DashboardHeader";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";

const KeywordPage = () => {
  // useNoSignInRedirect();

  return (
    <main className="flex justify-start items-start mx-auto pt-67 h-screen w-full max-w-1440">
      <DashboardSidebar />
      <section className="w-full h-full flex flex-col justify-start">
        <DashboardHeader />
        <PostCardList />
      </section>
      <Outlet />
    </main>
  );
};

export default KeywordPage;
