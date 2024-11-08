import changeDayFormat from "../../../utils/changeDayFormat";
import getDate from "../../../utils/getDate";
import KeywordChip from "../../Chip/KeywordChip";
import PropTypes from "prop-types";

const UserGroupCard = ({ groupName, keywordList, createdAt, updatedAt }) => {
  const createdDate = getDate(createdAt);
  const updatedDate = getDate(updatedAt);

  return (
    <div className="flex flex-col items-start justify-center gap-5 w-full border-2 border-rose-200/80 bg-white rounded-[30px] px-25 py-15">
      <p className="flex items-center gap-10">
        <span className="text-purple-600 text-20">1️⃣ Group Name: </span>
        <span className="text-rose-400 text-18">{groupName}</span>
      </p>
      <p className="flex items-center gap-10">
        <span className="text-purple-600 text-20">2️⃣ Keyword List: </span>
        <span className="text-rose-400 text-18">
          {keywordList.map((keyword) => {
            <KeywordChip key={keyword.id} keywordName={keyword.name} />;
          })}
        </span>
      </p>
      <p className="flex items-center gap-10">
        <span className="text-purple-600 text-20">3️⃣ Created date: </span>
        <span className="text-rose-400 text-18">
          {createdDate.currentYear}년 {createdDate.currentMonth}월 {createdDate.currentDate}일{" "}
          {changeDayFormat(createdDate.currentDay)} {createdDate.currentHour}시{" "}
          {createdDate.currentMinute}분
        </span>
      </p>
      <p className="flex items-center gap-10">
        <span className="text-purple-600 text-20">4️⃣ Updated date: </span>
        <span className="text-rose-400 text-18">
          {updatedDate
            ? `${updatedDate.currentYear}년 ${updatedDate.currentMonth}월 ${updatedDate.currentDate}일 ${changeDayFormat(updatedDate.currentDay)} ${updatedDate.currentHour}시 ${updatedDate.currentMinute}분`
            : "수정 내역이 없습니다"}
        </span>
      </p>
    </div>
  );
};

export default UserGroupCard;

UserGroupCard.propTypes = {
  groupName: PropTypes.string.isRequired,
  keywordList: PropTypes.arrayOf(PropTypes.string).isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};
