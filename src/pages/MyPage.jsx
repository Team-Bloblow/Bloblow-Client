import MyPageSidebar from "../components/Sidebar/MyPageSidebar";
import useNoSignInRedirect from "../hooks/useNoSignInRedirect";

const MyPage = () => {
  useNoSignInRedirect();

  return (
    <main className="flex items-center gap-50 mx-auto mt-80 w-full max-w-1200 px-40 py-30">
      <MyPageSidebar />
      <section className=""></section>
    </main>
  );
};

export default MyPage;
