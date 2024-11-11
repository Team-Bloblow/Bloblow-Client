import { useParams } from "react-router-dom";

import TodayPostCountCard from "../components/Card/Chart/TodayPostCountCard";

const KeywordPage = () => {
  const { keywordId } = useParams();

  return (
    <div className="flex">
      <TodayPostCountCard keywordId={keywordId} />
    </div>
  );
};

export default KeywordPage;
