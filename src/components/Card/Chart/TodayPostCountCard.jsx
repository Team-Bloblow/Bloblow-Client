import DownArrowIcon from "../../Icon/DownArrowIcon";
import UpArrowIcon from "../../Icon/UpArrowIcon";

const TodayPostCountCard = () => {
  const data = {
    todayPostCount: 18,
    diffPostCount: 10,
    diffPercent: 80,
  };

  return (
    <div className="mt-100 w-1/3 p-10">
      <span>오늘의 게시물</span>
      <p>어제보다 게시물 수 {data.diffPostCount}개 증가</p>
      <div className="flex">
        <div className="text-50">{data.todayPostCount}</div>
        <div className="flex">
          {data.diffPostCount >= 0 ? <UpArrowIcon /> : <DownArrowIcon />}
          {data.diffPercent}%
        </div>
      </div>
    </div>
  );
};

export default TodayPostCountCard;
