import UserGroupCardList from "../components/Card/UserGroup/UserGroupCardList";
import MyPageSidebar from "../components/Sidebar/MyPageSidebar";
import useNoSignInRedirect from "../hooks/useNoSignInRedirect";

const MyPage = () => {
  useNoSignInRedirect();

  return (
    <main className="flex flex-col items-start gap-20 mx-auto pt-100 w-full h-screen max-w-1200 px-40 pb-10 lg:flex-row">
      <MyPageSidebar />
      <UserGroupCardList />
    </main>
  );
};

export default MyPage;
