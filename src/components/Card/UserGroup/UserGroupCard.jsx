import { Link } from "react-router-dom";

import getDate from "../../../utils/getDate";
import KeywordChip from "../../Chip/KeywordChip";
import PropTypes from "prop-types";

const UserGroupCard = ({ groupId, groupName, keywordList, updatedAt }) => {
  const updatedDate = getDate(updatedAt);

  return (
    <Link to={`/dashboard/${groupId}`}>
      <div className="flex flex-col items-start justify-center gap-7 w-full border-2 border-slate-200/80 bg-white rounded-[8px] pl-30 pr-20 py-10 shadow-sm hover:border-slate-300/90 hover:shadow-md">
        <p className="flex items-center text-black text-20 font-semibold">{groupName}</p>
        <div className="flex items-center gap-5 w-full mb-2">
          {keywordList.map((keyword) => (
            <KeywordChip
              key={keyword._id}
              keywordName={keyword.keyword}
              styles="flex-center text-14 px-5 py-2 bg-blue-100/80 text-black rounded-[3px]"
            />
          ))}
        </div>
        <p className="flex items-center gap-5 text-slate-500 text-13">
          {updatedDate.currentYear}년 {updatedDate.currentMonth}월 {updatedDate.currentDate}일
        </p>
      </div>
    </Link>
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
  updatedAt: PropTypes.string.isRequired,
};
