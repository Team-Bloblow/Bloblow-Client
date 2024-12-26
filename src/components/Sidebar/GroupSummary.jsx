import useBoundStore from "../../store/client/useBoundStore";
import getDateDiff from "../../utils/getDateDiff";

const GroupSummary = () => {
  const userGroupList = useBoundStore((state) => state.userGroupList);
  const groupLatestUpdated = userGroupList.reduce((prev, curr) => {
    return new Date(prev.updatedAt) <= new Date(curr.updatedAt) ? curr : prev;
  });
  const passedDate = getDateDiff("today", groupLatestUpdated.updatedAt);

  return (
    <div className="flex flex-col gap-20 w-full h-full px-15 lg:px-15 py-10 lg:py-15">
      <div className="flex justify-between items-end">
        <span className="text-20 font-semibold">최근 업데이트</span>
        <span className="text-12 font-light text-gray-500">{passedDate}일 전</span>
      </div>
      <div className="flex justify-between">
        <span className="text-17 font-light text-gray-600">그룹</span>
        <span className="text-17 font-semibold">그룹 이름</span>
      </div>
      <div className="flex justify-between">
        <span className="text-15 font-light text-gray-600">키워드명</span>
        <span className="text-15 font-light text-gray-600">게시물 수</span>
      </div>
    </div>
  );
};

export default GroupSummary;
