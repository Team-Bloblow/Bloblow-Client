import { Link } from "react-router-dom";

import changeDayFormat from "../../../utils/changeDayFormat";
import getDate from "../../../utils/getDate";
import PropTypes from "prop-types";

const PostCard = ({ postTitle, postContent, likeCount, commentCount, link, createdAt }) => {
  const createdDate = getDate(createdAt);

  return (
    <div className="flex flex-col items-start justify-center gap-3 w-full border-2 border-rose-200/80 bg-white rounded-[30px] px-20 py-10">
      <p className="flex items-center gap-10">
        <span className="text-purple-500/80 text-18">{postTitle}</span>
      </p>
      <p className="flex items-center gap-10">
        <span className="text-purple-400/80 text-16">{postContent}</span>
      </p>
      <p className="flex justify-between items-center">
        <p className="flex items-center gap-10">
          <span className="text-rose-400/80 text-14">
            좋아요
            <span className="text-rose-400"> {likeCount}</span>
          </span>
          <span className="text-rose-400/80 text-14">
            댓글수
            <span className="text-rose-400"> {commentCount}</span>
          </span>
          <span className="text-rose-400/80 text-14">
            {`${createdDate.currentYear}년 ${createdDate.currentMonth}월 ${createdDate.currentDate}일 ${changeDayFormat(createdDate.currentDay)} ${createdDate.currentHour}시 ${createdDate.currentMinute}분`}
          </span>
        </p>
        <Link to={link} target="_blank" rel="noopener">
          <span className="text-pink-200 text-14">블로그 바로가기</span>
        </Link>
      </p>
    </div>
  );
};

export default PostCard;

PostCard.propTypes = {
  postTitle: PropTypes.string.isRequired,
  postContent: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  link: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};
