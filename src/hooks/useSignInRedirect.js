import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useBoundStore from "../store/client/useBoundStore";
import { getAuth } from "firebase/auth";

const useSignInRedirect = () => {
  const navigate = useNavigate();
  const isSignIn = useBoundStore((state) => state.isSignIn);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (isSignIn || user) {
      navigate("/myPage");
    }
  }, [isSignIn, navigate, user]);
};

export default useSignInRedirect;
