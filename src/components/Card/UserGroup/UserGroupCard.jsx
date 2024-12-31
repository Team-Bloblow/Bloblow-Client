import { Link } from "react-router-dom";

import getDate from "../../../utils/getDate";
import KeywordChip from "../../Chip/KeywordChip";
import UpdateIcon from "../../Icon/UpdateIcon";
import PropTypes from "prop-types";

const UserGroupCard = ({ groupId, groupName, keywordList, updatedAt }) => {
  const updatedDate = getDate(updatedAt);

  return (
    <Link to={`/dashboard/${groupId}`}>
      <div className="flex flex-col items-start justify-center gap-7 w-full border-2 border-slate-200/80 bg-white rounded-[5px] px-30 py-12 shadow-sm hover:border-emerald-900/30 hover:shadow-md">
        <p className="flex items-center text-black text-20 font-semibold">{groupName}</p>
        <div className="flex items-center flex-wrap gap-5 w-full mb-2">
          {keywordList.map((keyword) => (
            <KeywordChip
              key={keyword._id}
              keywordName={"# " + keyword.keyword}
              styles="flex-center text-15 px-7 py-3 bg-green-500/10 text-black rounded-[3px]"
            />
          ))}
        </div>
        <p className="flex items-center gap-5 text-slate-500 text-13">
          <UpdateIcon className="size-13" />
          마지막 업데이트 : {updatedDate.currentYear}년 {updatedDate.currentMonth}월{" "}
          {updatedDate.currentDate}일
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
