import { Route, Routes } from "react-router-dom";

import ReactQueryProviders from "../config/ReactQueryProvider";
import GroupPage from "./GroupPage";
import HomePage from "./HomePage";
import KeywordPage from "./KeywordPage";
import MyPage from "./MyPage";

const App = () => {
  return (
    <ReactQueryProviders>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/dashboard">
          <Route path=":groupId">
            <Route index element={<GroupPage />} />
            <Route path=":keywordId" element={<KeywordPage />} />
          </Route>
        </Route>
      </Routes>
    </ReactQueryProviders>
  );
};

export default App;
