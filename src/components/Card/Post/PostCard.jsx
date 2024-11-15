import { Link } from "react-router-dom";

import getDate from "../../../utils/getDate";
import sanitizeHtmlEntity from "../../../utils/sanitizeHtmlEntity";
import AdChip from "../../Chip/AdChip";
import LinkIcon from "../../Icon/LinkIcon";
import PropTypes from "prop-types";

const PostCard = ({
  postTitle,
  postDescription,
  likeCount,
  commentCount,
  link,
  createdAt,
  isAd,
}) => {
  const createdDate = getDate(createdAt);

  return (
    <div className="flex flex-col items-start justify-center gap-5 w-full border-3 border-slate-200/80 bg-white rounded-[8px] px-25 py-15 hover:border-emerald-900/30 hover:shadow-md">
      <div className="flex justify-between items-start w-full mb-8">
        <span className="text-green-900 text-22 font-bold">{sanitizeHtmlEntity(postTitle)}</span>
        {isAd && <AdChip />}
      </div>
      <p className="flex items-center gap-10 mb-10">
        <span className="text-gray-800 text-16">{sanitizeHtmlEntity(postDescription)}</span>
      </p>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-10 ">
          <span className="text-slate-500 text-14">
            공감
            <span className="text-slate-900"> {likeCount}</span>
          </span>
          <span className="text-slate-500 text-14">
            댓글
            <span className="text-slate-900"> {commentCount}</span>
          </span>
          <span className="text-slate-500 text-14">
            {createdDate.currentYear}년 {createdDate.currentMonth}월 {createdDate.currentDate}일
          </span>
        </div>
        <Link to={link} target="_blank" rel="noopener">
          <p className="flex items-center gap-5 text-black text-14">
            <LinkIcon className="size-16" /> 블로그 바로가기
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;

PostCard.propTypes = {
  postTitle: PropTypes.string.isRequired,
  postDescription: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  isAd: PropTypes.bool.isRequired,
};
