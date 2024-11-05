import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useBoundStore from "../store/client/useBoundStore";
import { getAuth } from "firebase/auth";

const useNoSignInRedirect = () => {
  const navigate = useNavigate();
  const isSignIn = useBoundStore((state) => state.isSignIn);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!isSignIn || !user) {
      navigate("/");
    }
  }, [isSignIn, navigate, user]);
};

export default useNoSignInRedirect;
