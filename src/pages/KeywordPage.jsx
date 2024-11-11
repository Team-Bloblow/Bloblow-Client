import { useParams } from "react-router-dom";

import PeriodPostCountCard from "../components/Card/Chart/PeriodPostCountCard";
import TodayPostCountCard from "../components/Card/Chart/TodayPostCountCard";

const KeywordPage = () => {
  const { keywordId } = useParams();

  return (
    <div className="flex">
      <TodayPostCountCard keywordId={keywordId} />
      <PeriodPostCountCard keywordId={keywordId} />
    </div>
  );
};

export default KeywordPage;
