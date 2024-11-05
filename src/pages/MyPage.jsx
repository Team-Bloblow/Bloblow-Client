import useNoSignInRedirect from "../hooks/useNoSignInRedirect";

const MyPage = () => {
  useNoSignInRedirect();

  return <div className="mx-auto mt-80 w-full max-w-1200 px-10">마이페이지</div>;
};

export default MyPage;
