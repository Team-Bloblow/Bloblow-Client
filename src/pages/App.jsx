import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../components/Layout/Header";
import Loading from "../components/UI/Loading";
import ReactQueryProviders from "../config/ReactQueryProvider";
import useBoundStore from "../store/client/useBoundStore";
import GroupPage from "./GroupPage";
import HomePage from "./HomePage";
import KeywordPage from "./KeywordPage";
import MyPage from "./MyPage";
import NotFoundPage from "./NotFoundPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const setIsSignIn = useBoundStore((state) => state.setIsSignIn);
  const setUserInfo = useBoundStore((state) => state.setUserInfo);
  const signOut = useBoundStore((state) => state.signOut);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const { email, displayName, photoUrl: photoURL } = user.reloadUserInfo;

        setIsSignIn(true);
        setUserInfo({ uid, email, displayName, photoURL });
        setIsAuthChecked(true);
      } else {
        signOut();
        setIsAuthChecked(true);
      }
    });

    return () => unsubscribe();
  }, [setIsSignIn, setUserInfo, signOut]);

  return (
    <ReactQueryProviders>
      <Header isAuthChecked={isAuthChecked} />
      {isAuthChecked ? (
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/dashboard">
            <Route path=":groupId">
              <Route index element={<GroupPage />} />
              <Route path=":keywordId" element={<KeywordPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <div className="flex h-screen w-screen mt-64 justify-center align-center">
          <Loading width={60} height={60} text={""} />
        </div>
      )}
    </ReactQueryProviders>
  );
};

export default App;
