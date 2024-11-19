import useSignInRedirect from "../hooks/useSignInRedirect";

const NotFoundPage = () => {
  useSignInRedirect();

  return (
    <main className="flex-col-center mx-auto pt-70 w-full h-screen max-w-1200 px-40 pb-10 cursor-default">
      <div className="flex-col-center pb-100">
        <span className="font-bold text-black text-180">404</span>
        <div className="flex-col-center gap-10">
          <span className="text-28">찾을 수 없는 페이지 입니다</span>
          <p className="flex-col-center">
            <span className="text-20">존재하지 않는 주소를 입력하셨거나,</span>
            <span className="text-20">
              요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
