import Logo from "../components/Common/Logo";
import Footer from "../components/Layout/Footer";
import useSignInRedirect from "../hooks/useSignInRedirect";

const HomePage = () => {
  useSignInRedirect();

  return (
    <>
      <main className="flex-col-center gap-15 mx-auto w-full h-screen max-w-1200 px-10">
        <Logo styles="text-120 animate-fadeIn hover:cursor-default" type="main" />
        <section className="flex-col-center gap-10 text-pink-500">
          <p className="text-20">관심있는 키워드를 구독하여 소식을 받아보세요</p>
          <p className="text-19">로그인 후 서비스를 이용해주시기 바랍니다</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
