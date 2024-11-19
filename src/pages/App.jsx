import { Route, Routes } from "react-router-dom";

import Header from "../components/Layout/Header";
import ReactQueryProviders from "../config/ReactQueryProvider";
import GroupPage from "./GroupPage";
import HomePage from "./HomePage";
import KeywordPage from "./KeywordPage";
import MyPage from "./MyPage";
import NotFoundPage from "./NotFoundPage";

const App = () => {
  return (
    <ReactQueryProviders>
      <Header />
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
    </ReactQueryProviders>
  );
};

export default App;
