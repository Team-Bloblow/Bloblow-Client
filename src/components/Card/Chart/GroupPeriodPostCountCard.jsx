import GroupLineChart from "../../Chart/GroupLineChart";
import GroupPeriodPagination from "../../Pagination/GroupPeriodPagination";
import PropTypes from "prop-types";

const GroupPeriodPostCountCard = ({ groupPostCountData, setCursorId, isPlaceholderData }) => {
  return (
    <article className="flex flex-col gap-6 w-full h-full p-10 border-2 rounded-md">
      <span className="flex-shrink-0 bg-green-100/20 px-10 py-5 rounded-[2px]">주간 게시물 수</span>
      <div className="flex-col-center">
        <GroupLineChart chartData={groupPostCountData} />
        <GroupPeriodPagination
          chartData={groupPostCountData}
          setCursorId={setCursorId}
          isPlaceholderData={isPlaceholderData}
        />
      </div>
    </article>
  );
};

export default GroupPeriodPostCountCard;

GroupPeriodPostCountCard.propTypes = {
  groupPostCountData: PropTypes.shape({
    groupId: PropTypes.string.isRequired,
    keywordIdList: PropTypes.arrayOf(PropTypes.string).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        postCountList: PropTypes.arrayOf(PropTypes.number),
        likeCountList: PropTypes.arrayOf(PropTypes.number),
        commentCountList: PropTypes.arrayOf(PropTypes.number),
        dates: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
    hasPrevious: PropTypes.bool.isRequired,
    hasNext: PropTypes.bool.isRequired,
    cursorId: PropTypes.string.isRequired,
    previousCursorId: PropTypes.string.isRequired,
    nextCursorId: PropTypes.string.isRequired,
  }).isRequired,
  setCursorId: PropTypes.func.isRequired,
  isPlaceholderData: PropTypes.bool.isRequired,
};
