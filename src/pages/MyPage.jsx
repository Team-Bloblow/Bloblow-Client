import MyPageSidebar from "../components/Sidebar/MyPageSidebar";
import useNoSignInRedirect from "../hooks/useNoSignInRedirect";

const MyPage = () => {
  useNoSignInRedirect();

  return (
    <main className="flex items-start gap-50 mx-auto mt-80 w-full max-w-1200 px-40 py-30">
      <MyPageSidebar />
      <section className="flex flex-col justify-start gap-10 bg-white border-4 border-pink-200 rounded-[30px] py-40 px-40 w-full h-430 overflow-y-scroll"></section>
    </main>
  );
};

export default MyPage;
