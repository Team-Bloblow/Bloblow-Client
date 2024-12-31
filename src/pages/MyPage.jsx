import UserGroupCardList from "../components/Card/UserGroup/UserGroupCardList";
import MyPageSidebar from "../components/Sidebar/MyPageSidebar";
import useNoSignInRedirect from "../hooks/useNoSignInRedirect";

const MyPage = () => {
  useNoSignInRedirect();

  return (
    <main className="flex flex-col items-start gap-20 md:gap-30 mx-auto pt-100 w-full h-screen max-w-1200 px-25 md:px-40 pb-10 md:flex-row">
      <MyPageSidebar />
      <UserGroupCardList />
    </main>
  );
};

export default MyPage;
