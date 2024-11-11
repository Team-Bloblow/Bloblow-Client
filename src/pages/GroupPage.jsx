import { Outlet } from "react-router-dom";

import DashboardHeader from "../components/Header/DashboardHeader";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";

const GroupPage = () => {
  return (
    <main className="flex justify-start items-start mx-auto pt-67 h-screen w-full max-w-1440">
      <DashboardSidebar />
      <section className="w-full h-full flex flex-col justify-start">
        <DashboardHeader />
      </section>
      <Outlet />
    </main>
  );
};

export default GroupPage;
