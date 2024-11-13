import SignInButton from "../components/Button/SignInButton";
import Logo from "../components/Common/Logo";
import Footer from "../components/Layout/Footer";
import { SIGN_BUTTON_TYPE } from "../config/constants";
import useSignInRedirect from "../hooks/useSignInRedirect";

const HomePage = () => {
  useSignInRedirect();

  return (
    <main className="flex flex-col items-center w-full h-screen">
      <div className="w-full h-full flex-grow-1 flex-center gap-30 p-50">
        <section className="w-full flex-center pr-100">
          <div className="flex flex-col items-start justify-center gap-20">
            <Logo styles="text-100 animate-fadeInFast hover:cursor-default" />
            <article className="flex flex-col items-start gap-10 animate-fadeInSlow text-gray-800 mb-20">
              <p className="text-20">관심있는 키워드를 구독하여 소식을 받아보세요</p>
              <p className="text-20">그룹 내의 여러 키워드 지표를 비교해보세요</p>
            </article>
            <SignInButton type={SIGN_BUTTON_TYPE.LANDING_PAGE} />
          </div>
        </section>
        <div className="w-700">스크린샷</div>
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
