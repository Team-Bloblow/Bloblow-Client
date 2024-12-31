import { Link } from "react-router-dom";

import getDate from "../../../utils/getDate";
import sanitizeHtmlEntity from "../../../utils/sanitizeHtmlEntity";
import AdChip from "../../Chip/AdChip";
import CommentIcon from "../../Icon/CommentIcon";
import LikeIcon from "../../Icon/LikeIcon";
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
    <div className="flex flex-col items-start justify-center gap-5 w-full border-1 border-slate-400 bg-white rounded-[2px] px-25 py-15 cursor-pointer hover:border-2 hover:shadow-md">
      <Link to={link} target="_blank" rel="noopener noreferrer" className="w-full">
        <div className="flex justify-between items-start w-full mb-4">
          <span className="md:text-18 text-17 font-bold">{sanitizeHtmlEntity(postTitle)}</span>
          {isAd && <AdChip />}
        </div>
        <p className="flex items-center gap-10 w-full mb-10">
          <span className="text-gray-800 md:text-16 text-15">
            {sanitizeHtmlEntity(postDescription)}
          </span>
        </p>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-10 ">
            <span className="flex items-center text-slate-500 text-14 gap-3">
              <LikeIcon className="w-20 h-20 text-[#f1948a]" />
              공감
              <span className="text-slate-900 md:text-15 text-14 font-semibold"> {likeCount}</span>
            </span>
            <span className="flex items-center text-slate-500 text-14 gap-3">
              <CommentIcon className="w-20 h-20 text-[#aeb6bf]" />
              댓글
              <span className="text-slate-900 md:text-15 text-14 font-semibold">
                {" "}
                {commentCount}
              </span>
            </span>
          </div>
          <div>
            <span className="text-slate-500 md:text-14 text-13 float-right">
              {createdDate.currentYear}년 {createdDate.currentMonth}월 {createdDate.currentDate}일
              작성
            </span>
          </div>
        </div>
      </Link>
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
