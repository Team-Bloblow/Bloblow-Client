import { Link } from "react-router-dom";

import changeDayFormat from "../../../utils/changeDayFormat";
import getDate from "../../../utils/getDate";
import KeywordChip from "../../Chip/KeywordChip";
import PropTypes from "prop-types";

const UserGroupCard = ({ groupId, groupName, keywordList, createdAt, updatedAt }) => {
  const createdDate = getDate(createdAt);
  const updatedDate = getDate(updatedAt);

  return (
    <div className="flex justify-between gap-5 w-full border-3 border-rose-200/80 bg-white rounded-[30px] pl-30 pr-20 py-15">
      <div className="flex flex-col items-start justify-center">
        <p className="flex items-center gap-10">
          <span className="text-purple-600 text-19 font-bold">그룹명: </span>
          <span className="text-rose-400 text-18">{groupName}</span>
        </p>
        <p className="flex items-center gap-10 w-full">
          <span className="text-purple-600 text-19 font-bold flex-shrink-0">키워드 리스트: </span>
          <p className="flex items-center gap-5 w-full">
            {keywordList.map((keyword) => (
              <KeywordChip key={keyword._id} keywordName={keyword.keyword} />
            ))}
          </p>
        </p>
        <p className="flex items-center gap-10">
          <span className="text-purple-600 text-19 font-bold">그룹 생성일: </span>
          <span className="text-rose-400 text-18">
            {createdDate.currentYear}년 {createdDate.currentMonth}월 {createdDate.currentDate}일{" "}
            {changeDayFormat(createdDate.currentDay)} {createdDate.currentHour}시{" "}
            {createdDate.currentMinute}분
          </span>
        </p>
        <p className="flex items-center gap-10">
          <span className="text-purple-600 text-19 font-bold">그룹 수정일: </span>
          <span className="text-rose-400 text-18">
            {updatedDate
              ? `${updatedDate.currentYear}년 ${updatedDate.currentMonth}월 ${updatedDate.currentDate}일 ${changeDayFormat(updatedDate.currentDay)} ${updatedDate.currentHour}시 ${updatedDate.currentMinute}분`
              : "수정 내역이 없습니다"}
          </span>
        </p>
      </div>
      <Link to={`/dashboard/${groupId}`} className="flex items-end">
        <p className="bottom-15 right-20 px-10 py-5 rounded-[12px] border-3 border-rose-200/80 hover:bg-rose-50 text-rose-900">
          대시보드로 이동
        </p>
      </Link>
    </div>
  );
};

export default UserGroupCard;

UserGroupCard.propTypes = {
  groupId: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  keywordList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      keyword: PropTypes.string.isRequired,
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};
