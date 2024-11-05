import Logo from "../components/Logo";
import useSignInRedirect from "../hooks/useSignInRedirect";

const HomePage = () => {
  useSignInRedirect();

  return (
    <main className="flex-col-center gap-30 mx-auto mt-80 w-full max-w-1200 px-10 py-100">
      <Logo styles="text-120 animate-fadeIn hover:cursor-default" type="main" />
      <section className="flex-col-center gap-10 text-pink-500">
        <p className="text-20">관심있는 블로그를 구독하여 소식을 받아보세요</p>
        <p className="text-19">로그인 후 서비스를 이용해주시기 바랍니다</p>
      </section>
    </main>
  );
};

export default HomePage;
