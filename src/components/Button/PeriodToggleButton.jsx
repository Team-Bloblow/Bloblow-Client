import { useState } from "react";

import { PERIOD_TYPE } from "../../config/constants";
import PropTypes from "prop-types";

const PeriodToggleButton = ({ period, setPeriod, setCursorId }) => {
  const [toggleOnPeriod, setToggleOnPeriod] = useState(() => period);

  const handleToggleClick = (checkedPeriod) => {
    setToggleOnPeriod(checkedPeriod);
    setPeriod(checkedPeriod);
    setCursorId("");
  };

  return (
    <div className="flex w-[60%] h-full border-gray-200 border-1 float-right">
      <div
        className={`inline-flex w-1/3 text-center justify-center cursor-pointer ${toggleOnPeriod === PERIOD_TYPE.WEEKLY && "text-white bg-[#00684A]"}`}
        onClick={() => handleToggleClick(PERIOD_TYPE.WEEKLY)}
      >
        <label className="radio text-center self-center py-4 px-5">
          <input
            type="radio"
            name="period"
            checked={toggleOnPeriod === PERIOD_TYPE.WEEKLY}
            onChange={() => handleToggleClick(PERIOD_TYPE.WEEKLY)}
            hidden
          />
          {PERIOD_TYPE.WEEKLY_KR}
        </label>
      </div>
      <div
        className={`inline-flex w-1/3 text-center justify-center border-x-1 cursor-pointer ${toggleOnPeriod === PERIOD_TYPE.MONTHLY_DAILY && "text-white bg-[#00684A]"}`}
        onClick={() => handleToggleClick(PERIOD_TYPE.MONTHLY_DAILY)}
      >
        <label className="radio text-center self-center py-4 px-5">
          <input
            type="radio"
            name="period"
            checked={toggleOnPeriod === PERIOD_TYPE.MONTHLY_DAILY}
            onChange={() => handleToggleClick(PERIOD_TYPE.MONTHLY_DAILY)}
            hidden
          />
          {PERIOD_TYPE.MONTHLY_DAILY_KR}
        </label>
      </div>
      <div
        className={`inline-flex w-1/3 text-center justify-center cursor-pointer ${toggleOnPeriod === PERIOD_TYPE.MONTHLY_WEEKLY && "text-white bg-[#00684A]"}`}
        onClick={() => handleToggleClick(PERIOD_TYPE.MONTHLY_WEEKLY)}
      >
        <label className="radio text-center self-center py-4 px-5">
          <input
            type="radio"
            name="period"
            checked={toggleOnPeriod === PERIOD_TYPE.MONTHLY_WEEKLY}
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
