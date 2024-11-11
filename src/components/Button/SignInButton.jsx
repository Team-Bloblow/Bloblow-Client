import { useNavigate } from "react-router-dom";

import asyncPostSignIn from "../../api/auth/asyncPostSignIn";
import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";
import { useMutation } from "@tanstack/react-query";

const SignInButton = () => {
  const navigate = useNavigate();

  const isSignIn = useBoundStore((state) => state.isSignIn);
  const asyncSignIn = useBoundStore((state) => state.asyncSignIn);
  const signOut = useBoundStore((state) => state.signOut);
  const setIsSignIn = useBoundStore((state) => state.setIsSignIn);
  const setUserInfo = useBoundStore((state) => state.setUserInfo);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);
  const googleSignInError = useBoundStore((state) => state.error.googleSignInError);
  const addModal = useBoundStore((state) => state.addModal);

  const signInMutation = useMutation({
    mutationFn: (userInfo) => asyncPostSignIn(userInfo),
  });

  const handleButtonClick = async () => {
    if (isSignIn) {
      signOut();
    } else {
      const { uid, email, displayName, photoURL } = await asyncSignIn();
      if (googleSignInError) {
        addModal(MODAL_TYPE.ERROR);
      }

      signInMutation.mutate(
        { uid, email, displayName, photoURL },
        {
          onSuccess: (data) => {
            if (data?.message?.includes("Error occured")) {
              addModal(MODAL_TYPE.ERROR);
              return;
            }

            const { uid, email, displayName, photoURL } = data.userResult;
            setIsSignIn(true);
            setUserInfo({ uid, email, displayName, photoURL });
            navigate("/myPage");
          },
          onError: () => {
            addModal(MODAL_TYPE.ERROR);
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
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ERROR && (
        <ErrorModal errorMessage={ERROR_MESSAGE.SIGN_IN_ERROR} />
      )}
    </Button>
  );
};

export default SignInButton;
