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

  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        className="z-30 px-4 h-full cursor-pointer group focus:outline-none"
        onClick={() => handlePagingClick("previous")}
        disabled={!chartData?.hasPrevious || isPlaceholderData}
      >
        <LeftCarouselIcon isDisabled={!chartData?.hasPrevious || isPlaceholderData} />
      </button>
      <span className="">
        {changeDateWithDotFormat(chartData?.dates[0]) +
          " ~ " +
          changeDateWithDotFormat(chartData?.dates[chartData?.dates.length - 1])}
      </span>
      <button
        type="button"
        className="z-30 px-4 h-full cursor-pointer group focus:outline-none"
        onClick={() => handlePagingClick("next")}
        disabled={!chartData?.hasNext || isPlaceholderData}
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
    unit: PropTypes.string,
    cursorId: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.number),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        keyword: PropTypes.string,
        keywordId: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      })
    ),
    hasPrevious: PropTypes.bool,
    hasNext: PropTypes.bool,
  }).isRequired,
  setCursorId: PropTypes.func.isRequired,
  isPlaceholderData: PropTypes.bool.isRequired,
};
