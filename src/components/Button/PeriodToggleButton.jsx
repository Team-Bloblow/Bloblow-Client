import { PERIOD_TYPE } from "../../config/constants";
import PropTypes from "prop-types";

const PeriodToggleButton = ({ period, setPeriod, setCursorId }) => {
  const handleToggleClick = (clickedPeriod) => {
    setPeriod(clickedPeriod);
    setCursorId("");
  };

  return (
    <div className="flex w-260 h-full border-gray-200 border-1 float-right">
      <div
        className={`inline-flex w-1/3 text-center justify-center cursor-pointer ${period === PERIOD_TYPE.WEEKLY ? "bg-gray-100 shadow-sm" : "bg-[#FFFFFF]"}`}
        onClick={() => handleToggleClick(PERIOD_TYPE.WEEKLY)}
      >
        <label className="radio text-center self-center py-4 px-5">
          <input
            type="radio"
            name="period"
            checked={period === PERIOD_TYPE.WEEKLY}
            onChange={() => handleToggleClick(PERIOD_TYPE.WEEKLY)}
            hidden
          />
          {PERIOD_TYPE.WEEKLY_KR}
        </label>
      </div>
      <div
        className={`inline-flex w-1/3 text-center justify-center border-x-1 cursor-pointer ${period === PERIOD_TYPE.MONTHLY_DAILY ? "bg-gray-100 shadow-sm" : "bg-[#FFFFFF]"}`}
        onClick={() => handleToggleClick(PERIOD_TYPE.MONTHLY_DAILY)}
      >
        <label className="radio text-center self-center py-4 px-5">
          <input
            type="radio"
            name="period"
            checked={period === PERIOD_TYPE.MONTHLY_DAILY}
            onChange={() => handleToggleClick(PERIOD_TYPE.MONTHLY_DAILY)}
            hidden
          />
          {PERIOD_TYPE.MONTHLY_DAILY_KR}
        </label>
      </div>
      <div
        className={`inline-flex w-1/3 text-center justify-center cursor-pointer ${period === PERIOD_TYPE.MONTHLY_WEEKLY ? "bg-gray-100 shadow-sm" : "bg-[#FFFFFF]"}`}
        onClick={() => handleToggleClick(PERIOD_TYPE.MONTHLY_WEEKLY)}
      >
        <label className="radio text-center self-center py-4 px-5">
          <input
            type="radio"
            name="period"
            checked={period === PERIOD_TYPE.MONTHLY_WEEKLY}
            onChange={() => handleToggleClick(PERIOD_TYPE.MONTHLY_WEEKLY)}
            hidden
          />
          {PERIOD_TYPE.MONTHLY_WEEKLY_KR}
        </label>
      </div>
    </div>
  );
};

export default PeriodToggleButton;

PeriodToggleButton.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
  setCursorId: PropTypes.func.isRequired,
};
