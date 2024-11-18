import { useNavigate } from "react-router-dom";

import asyncPostSignIn from "../../api/auth/asyncPostSignIn";
import { ERROR_MESSAGE, MODAL_TYPE, SIGN_BUTTON_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import SignOutIcon from "../Icon/SignOutIcon";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";

const SignInButton = ({ type }) => {
  const navigate = useNavigate();

  const isSignIn = useBoundStore((state) => state.isSignIn);
  const asyncSignIn = useBoundStore((state) => state.asyncSignIn);
  const signOut = useBoundStore((state) => state.signOut);
  const setIsSignIn = useBoundStore((state) => state.setIsSignIn);
  const setUserInfo = useBoundStore((state) => state.setUserInfo);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);
  const googleSignInError = useBoundStore((state) => state.authError.googleSignInError);
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

  if (type === SIGN_BUTTON_TYPE.LANDING_PAGE) {
    return (
      <Button
        styles="flex-center px-12 py-6 font-medium border-1 border-slate-400 bg-white rounded-[5px] text-black text-18 transition duration-500 ease-in-out hover:text-white hover:bg-green-500 hover:shadow-md"
        onClick={handleButtonClick}
      >
        놓친 인사이트 발견하기
        {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ERROR && (
          <ErrorModal errorMessage={ERROR_MESSAGE.SIGN_IN_ERROR} />
        )}
      </Button>
    );
  }

  return (
    <Button
      styles="flex-center px-12 py-6 font-medium border-1 border-slate-200 bg-white shadow rounded-[1px] text-black text-16 hover:bg-gray-200/30"
      onClick={handleButtonClick}
    >
      {isSignIn ? (
        <>
          <SignOutIcon />
          로그아웃
        </>
      ) : (
        "로그인"
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ERROR && (
        <ErrorModal errorMessage={ERROR_MESSAGE.SIGN_IN_ERROR} />
      )}
    </Button>
  );
};

export default SignInButton;

SignInButton.propTypes = {
  type: PropTypes.string,
};
