import { changeDateWithDotFormat } from "../../utils/date";
import LeftCarouselIcon from "../Icon/LeftCarouselIcon";
import RightCarouselIcon from "../Icon/RightCarouselIcon";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const GroupPeriodPagination = ({ chartData, setCursorId, isPlaceholderData }) => {
  const isPreviousButtonDisabled = !chartData?.hasPrevious || isPlaceholderData;
  const isNextButtonDisabled = !chartData?.hasNext || isPlaceholderData;

  return (
    <div className="flex justify-center items-center pt-10">
      {chartData?.items?.length > 0 ? (
        <>
          <Button
            styles={`z-30 px-4 h-full cursor-pointer group focus:outline-none ${isPreviousButtonDisabled ? "hover:cursor-default" : ""}`}
            onClick={() => setCursorId(chartData?.previousCursorId)}
            isDisabled={isPreviousButtonDisabled}
          >
            <LeftCarouselIcon isDisabled={isPreviousButtonDisabled} />
          </Button>
          <span className="text-16">
            {changeDateWithDotFormat(chartData?.items[0]?.dates[0]) +
              " ~ " +
              changeDateWithDotFormat(
                chartData?.items[0]?.dates[chartData?.items[0]?.dates.length - 1]
              )}
          </span>
          <Button
            styles={`z-30 px-4 h-full cursor-pointer group focus:outline-none ${isNextButtonDisabled ? "hover:cursor-default" : ""}`}
            onClick={() => setCursorId(chartData?.nextCursorId)}
            isDisabled={isNextButtonDisabled}
          >
            <RightCarouselIcon isDisabled={isNextButtonDisabled} />
          </Button>
        </>
      ) : (
        <>
          <span className="text-16 text-gray-500">키워드 등록후 확인할 수 있어요</span>
        </>
      )}
    </div>
  );
};

export default GroupPeriodPagination;

GroupPeriodPagination.propTypes = {
  chartData: PropTypes.shape({
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
