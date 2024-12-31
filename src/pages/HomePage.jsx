import SignInButton from "../components/Button/SignInButton";
import Logo from "../components/Common/Logo";
import Footer from "../components/Layout/Footer";
import Button from "../components/UI/Button";
import { SIGN_BUTTON_TYPE } from "../config/constants";
import useSignInRedirect from "../hooks/useSignInRedirect";

const HomePage = () => {
  useSignInRedirect();

  return (
    <main className="flex flex-col items-center w-full gap-20">
      <div className="w-full h-screen flex-grow-1 flex-center gap-30 p-25 sm:p-50 bg-emerald-100/30">
        <section className="w-full lg:w-[60%] flex-center">
          <div className="flex flex-col items-start justify-center gap-10">
            <Logo styles="text-60 lg:text-90 animate-fadeInFast hover:cursor-default" />
            <article className="flex flex-col items-start gap-20 animate-fadeInSlow text-gray-800 mb-5 sm:mb-20">
              <p className="text-20 sm:text-24 lg:text-26 font-bold">
                관심있는 키워드의 블로그 게시물만 쏙
              </p>
              <div className="flex flex-col items-start gap-10">
                <p className="text-16 sm:text-20">키워드를 구독하여 게시물 소식을 받아보세요</p>
                <p className="text-16 sm:text-20">원하는대로 게시물들을 필터링할 수 있어요</p>
              </div>
            </article>
            <div className="flex lg:hidden justify-center w-[90%] sm:w-[70%] md:w-[50%] border-2 border-green-100 mb-10 sm:mb-20">
              <img src="/assets/postListSample.png" alt="게시물 목록 샘플 이미지" />
            </div>
            <div className="flex gap-10 w-full">
              <SignInButton type={SIGN_BUTTON_TYPE.LANDING_PAGE} />
              <Button
                styles="flex-center px-12 py-6 font-medium border-1 border-slate-400 bg-green-300/60 rounded-[5px] text-black text-13 sm:text-18 transition duration-500 ease-in-out hover:text-white hover:bg-green-500 hover:shadow-md"
                destination={"/dashboard/sample"}
              >
                서비스 체험하기
              </Button>
            </div>
          </div>
        </section>
        <div className="hidden lg:flex flex-col justify-center items-center w-[60%] border-2 border-green-100">
          <img src="/assets/postListSample.png" alt="게시물 목록 샘플 이미지" />
        </div>
      </div>
      <div className="w-full h-screen flex-grow-1 flex-center gap-30 p-25 sm:p-50 mt-[-50px] mb-50">
        <div className="hidden lg:flex flex-col justify-center items-center w-[60%] border-2 border-green-100">
          <img src="/assets/groupChartSample.png" alt="그룹 차트 샘플 이미지" />
        </div>
        <section className="w-full lg:w-[60%] flex-center">
          <div className="flex flex-col lg:items-start items-end justify-center gap-20 animate-fadeInSlow text-gray-800 text-right lg:text-left">
            <p className="text-20 sm:text-24 lg:text-26 font-bold">
              매일매일 업데이트 되는 대시보드 차트
            </p>
            <div className="flex flex-col lg:items-start items-end gap-10 mb-20">
              <p className="text-16 sm:text-20">
                대시보드에서 수치화된 지표들의 추이를 분석할 수 있어요
              </p>
              <p className="text-16 sm:text-20">그룹화한 키워드 간의 지표를 비교해보세요</p>
            </div>
            <div className="flex lg:hidden justify-center w-full sm:w-[70%] md:w-[65%] border-2 border-green-100 mb-20">
              <img src="/assets/groupChartSample.png" alt="그룹 차트 샘플 이미지" />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
