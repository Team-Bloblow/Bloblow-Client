import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Layout/Header";
import Loading from "../components/UI/Loading";
import ReactQueryProviders from "../config/ReactQueryProvider";
import { initAmplitude } from "../config/amplitude";
import useBoundStore from "../store/client/useBoundStore";
import GroupPage from "./GroupPage";
import HomePage from "./HomePage";
import KeywordPage from "./KeywordPage";
import MyPage from "./MyPage";
import NotFoundPage from "./NotFoundPage";
import SampleGroupPage from "./SampleGroupPage";
import SampleKeywordPage from "./SampleKeywordPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const setIsSignIn = useBoundStore((state) => state.setIsSignIn);
  const setUserInfo = useBoundStore((state) => state.setUserInfo);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const isSampleRoute = pathname.startsWith("/dashboard/sample");

  useEffect(() => {
    initAmplitude();
  }, []);

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
        if (!isSampleRoute) {
          navigate("/");
        }

        setIsAuthChecked(true);
      }
    });

    return () => unsubscribe();
  }, [setIsSignIn, setUserInfo, navigate, isSampleRoute]);

  return (
    <ReactQueryProviders>
      <Header isAuthChecked={isAuthChecked} />
      {isAuthChecked ? (
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/dashboard">
            <Route path="sample">
              <Route index element={<SampleGroupPage />} />
              <Route path="keyword-one" element={<SampleKeywordPage />} />
              <Route path="keyword-two" element={<SampleKeywordPage />} />
            </Route>
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
