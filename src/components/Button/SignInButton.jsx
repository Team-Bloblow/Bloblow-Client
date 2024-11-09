import { useNavigate } from "react-router-dom";

import asyncPostSignIn from "../../api/auth/asyncPostSignIn";
import useBoundStore from "../../store/client/useBoundStore";
import Button from "../UI/Button";
import { useMutation } from "@tanstack/react-query";

const SignInButton = () => {
  const navigate = useNavigate();

  const isSignIn = useBoundStore((state) => state.isSignIn);
  const asyncSignIn = useBoundStore((state) => state.asyncSignIn);
  const signOut = useBoundStore((state) => state.signOut);
  const setIsSignIn = useBoundStore((state) => state.setIsSignIn);
  const setUserInfo = useBoundStore((state) => state.setUserInfo);
  const setServerSignInError = useBoundStore((state) => state.setServerSignInError);

  const signInMutation = useMutation({
    mutationFn: (userInfo) => asyncPostSignIn(userInfo),
  });

  const handleButtonClick = async () => {
    if (isSignIn) {
      signOut();
    } else {
      const { uid, email, displayName, photoURL } = await asyncSignIn();
      signInMutation.mutate(
        { uid, email, displayName, photoURL },
        {
          onSuccess: (data) => {
            const { uid, email, displayName, photoURL } = data.userResult;
            setIsSignIn(true);
            setUserInfo({ uid, email, displayName, photoURL });
            navigate("/myPage");
          },
          onError: ({ message }) => {
            setServerSignInError(message);
          },
        }
      );
    }
  };

  return (
    <Button
      styles="flex-center px-14 py-8 font-medium border-2 border-purple-200 bg-purple-400/80 rounded-[15px] text-white text-16 hover:bg-purple-500/80"
      onClick={handleButtonClick}
    >
      {isSignIn ? "로그아웃" : "로그인"}
    </Button>
  );
};

export default SignInButton;
