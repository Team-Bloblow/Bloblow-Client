import { changeDateWithDotFormat } from "../../utils/date";
import LeftCarouselIcon from "../Icon/LeftCarouselIcon";
import RightCarouselIcon from "../Icon/RightCarouselIcon";
import PropTypes from "prop-types";

const PeriodPagination = ({ chartData, setCursorId, isPlaceholderData }) => {
  const handlePagingClick = (type) => {
    const cursorIdDate = new Date(chartData.cursorId);

    if (type === "previous") {
      cursorIdDate.setDate(cursorIdDate.getDate() - 7);
    } else {
      cursorIdDate.setDate(cursorIdDate.getDate() + 7);
    }

    setCursorId(cursorIdDate.toISOString());
  };

  const isPreviousButtonDisabled = !chartData?.hasPrevious || isPlaceholderData;
  const isNextButtonDisabled = !chartData?.hasNext || isPlaceholderData;

  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        className={`z-30 px-4 h-full cursor-pointer group focus:outline-none ${isPreviousButtonDisabled && "hover:cursor-default"}`}
        onClick={() => handlePagingClick("previous")}
        disabled={isPreviousButtonDisabled}
      >
        <LeftCarouselIcon isDisabled={!chartData?.hasPrevious || isPlaceholderData} />
      </button>
      <span className="text-14">
        {changeDateWithDotFormat(chartData?.dates[0]) +
          " ~ " +
          changeDateWithDotFormat(chartData?.dates[chartData?.dates.length - 1])}
      </span>
      <button
        type="button"
        className={`z-30 px-4 h-full cursor-pointer group focus:outline-none ${isNextButtonDisabled && "hover:cursor-default"}`}
        onClick={() => handlePagingClick("next")}
        disabled={isNextButtonDisabled}
      >
        <RightCarouselIcon isDisabled={!chartData?.hasNext || isPlaceholderData} />
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
