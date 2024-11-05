import { useNavigate } from "react-router-dom";

import useBoundStore from "../../store/client/useBoundStore";
import Button from "../UI/Button";

const SignInButton = () => {
  const navigate = useNavigate();

  const isSignIn = useBoundStore((state) => state.isSignIn);
  const asyncSignIn = useBoundStore((state) => state.asyncSignIn);
  const signOut = useBoundStore((state) => state.signOut);

  const handleButtonClick = async () => {
    if (isSignIn) {
      signOut();
    } else {
      await asyncSignIn();
      navigate("/myPage");
    }
  };

  return (
    <Button
      styles="flex-center px-12 py-8 font-medium border-2 border-purple-200 bg-purple-400 rounded-[15px] text-white text-18 hover:bg-purple-500"
      onClick={handleButtonClick}
    >
      {isSignIn ? "로그아웃" : "로그인"}
    </Button>
  );
};

export default SignInButton;
