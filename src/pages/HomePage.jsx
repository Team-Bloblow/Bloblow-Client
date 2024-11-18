import SignInButton from "../components/Button/SignInButton";
import Footer from "../components/Layout/Footer";
import { SIGN_BUTTON_TYPE } from "../config/constants";
import { SIGNATURE_COLOR } from "../config/constants";
import useSignInRedirect from "../hooks/useSignInRedirect";

const HomePage = () => {
  useSignInRedirect();

  return (
    <main className="flex flex-col items-center w-full h-screen">
      <div className="w-full h-full flex-grow-1 flex-center gap-30 p-50">
        <section className="w-1200 flex-center pr-100">
          <div className="flex flex-col items-start justify-center gap-20">
            <span
              className={`font-bold bg-gradient-to-r bg-clip-text text-30 animate-fadeInFast hover:cursor-default from-[${SIGNATURE_COLOR.START}] via-[${SIGNATURE_COLOR.VIA}] via-40% to-[${SIGNATURE_COLOR.TO}] text-transparent`}
            >
              Bloblow
            </span>
            <span className="text-50 font-medium">놓치지 않고 필요한 것만 빠르게</span>
            <article className="flex flex-col items-start gap-10 animate-fadeInSlow text-gray-600 mb-20">
              <p className="text-20">네이버 블로그를 관심 키워드로 구독하세요</p>
              <p className="text-20">키워드별 인사이트를 한 곳에서 비교해 보세요</p>
            </article>
            <SignInButton type={SIGN_BUTTON_TYPE.LANDING_PAGE} />
          </div>
        </section>
        <div className="flex-center w-full h-full">
          <img src="../public/assets/image-home-chart.png" alt="home-chart" className="w-800"></img>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
