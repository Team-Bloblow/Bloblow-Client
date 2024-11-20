import SignInButton from "../components/Button/SignInButton";
import Logo from "../components/Common/Logo";
import Footer from "../components/Layout/Footer";
import { SIGN_BUTTON_TYPE } from "../config/constants";
import useSignInRedirect from "../hooks/useSignInRedirect";

const HomePage = () => {
  useSignInRedirect();

  return (
    <main className="flex flex-col items-center w-full gap-20 overflow-y-scroll">
      <div className="w-full h-screen flex-grow-1 flex-center gap-30 p-50 bg-emerald-100/30">
        <section className="w-[60%] flex-center pr-100">
          <div className="flex flex-col items-start justify-center gap-10">
            <Logo styles="text-90 animate-fadeInFast hover:cursor-default" />
            <article className="flex flex-col items-start gap-20 animate-fadeInSlow text-gray-800 mb-20">
              <p className="text-26 font-bold">관심있는 키워드의 블로그 게시물만 쏙</p>
              <div className="flex flex-col items-start gap-10">
                <p className="text-20">키워드를 구독하여 게시물 소식을 받아보세요</p>
                <p className="text-20">원하는대로 게시물들을 필터링할 수 있어요</p>
              </div>
            </article>
            <SignInButton type={SIGN_BUTTON_TYPE.LANDING_PAGE} />
          </div>
        </section>
        <div className="flex-col-center w-[40%]">스크린샷</div>
      </div>
      <div className="w-full h-screen flex-grow-1 flex-center gap-30 p-50 mt-[-50px] mb-50">
        <div className="flex-col-center w-[40%]">스크린샷</div>
        <section className="w-[60%] flex-center pr-100">
          <div className="flex flex-col items-start justify-center gap-20 animate-fadeInSlow text-gray-800">
            <p className="text-26 font-bold">매일매일 업데이트 되는 여러 지표에 대한 추이</p>
            <div className="flex flex-col items-start gap-10">
              <p className="text-20">대시보드를 활용하여 수치화된 지표들을 분석할 수 있어요</p>
              <p className="text-20">그룹화한 키워드 간의 지표를 비교해보세요</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
