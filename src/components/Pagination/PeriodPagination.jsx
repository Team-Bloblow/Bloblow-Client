import { changeDateWithDotFormat } from "../../utils/date";
import LeftCarouselIcon from "../Icon/LeftCarouselIcon";
import RightCarouselIcon from "../Icon/RightCarouselIcon";
import PropTypes from "prop-types";

const PeriodPagination = ({ chartData, setCursorId, isPlaceholderData }) => {
  const handlePagingClick = (type) => {
    if (type === "previous") {
      setCursorId(chartData.previousCursorId);
    } else {
      setCursorId(chartData.nextCursorId);
    }
  };

  const isPreviousButtonDisabled = !chartData?.hasPrevious || isPlaceholderData;
  const isNextButtonDisabled = !chartData?.hasNext || isPlaceholderData;

  return (
    <div className="flex justify-center items-center pt-10">
      <button
        type="button"
        className={`z-30 px-4 h-full cursor-pointer group focus:outline-none ${isPreviousButtonDisabled ? "hover:cursor-default" : ""}`}
        onClick={() => handlePagingClick("previous")}
        disabled={isPreviousButtonDisabled}
      >
        <LeftCarouselIcon isDisabled={isPreviousButtonDisabled} />
      </button>
      <span className="text-16">
        {changeDateWithDotFormat(chartData?.dates[0]) +
          " ~ " +
          changeDateWithDotFormat(chartData?.dates[chartData?.dates.length - 1])}
      </span>
      <button
        type="button"
        className={`z-30 px-4 h-full cursor-pointer group focus:outline-none ${isNextButtonDisabled ? "hover:cursor-default" : ""}`}
        onClick={() => handlePagingClick("next")}
        disabled={isNextButtonDisabled}
      >
        <RightCarouselIcon isDisabled={isNextButtonDisabled} />
      </button>
    </div>
  );
};

export default PeriodPagination;

PeriodPagination.propTypes = {
  chartData: PropTypes.shape({
    keywordId: PropTypes.string,
    keyword: PropTypes.string,
    cursorId: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
    postCountList: PropTypes.arrayOf(PropTypes.number),
    previousCursorId: PropTypes.string,
    nextCursorId: PropTypes.string,
    hasPrevious: PropTypes.bool,
    hasNext: PropTypes.bool,
  }).isRequired,
  setCursorId: PropTypes.func.isRequired,
  isPlaceholderData: PropTypes.bool.isRequired,
};
