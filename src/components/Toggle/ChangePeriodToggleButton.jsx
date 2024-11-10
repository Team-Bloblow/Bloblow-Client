import { useState } from "react";

import { PERIOD_TYPE } from "../../config/constants";
import PropTypes from "prop-types";

const ChangePeriodToggleButton = ({ periodUnit, setPeriodUnit }) => {
  const [isToggleOn, setIsToggleOn] = useState(() => periodUnit === PERIOD_TYPE.WEEKLY);

  const handleToggleClick = (unit) => {
    setIsToggleOn(unit === PERIOD_TYPE.WEEKLY);
    setPeriodUnit(PERIOD_TYPE[unit]);
  };

  return (
    <div className="w-full h-30">
      <div className="w-80 border-gray-200 border-2 rounded-xl float-right">
        <div
          className="inline-flex rounded-lg"
          onClick={() => handleToggleClick(PERIOD_TYPE.WEEKLY)}
        >
          <input
            type="radio"
            name="period_unit"
            id="weekly"
            checked={isToggleOn}
            onChange={() => handleToggleClick(PERIOD_TYPE.WEEKLY)}
            hidden
          />
          <label
            htmlFor="weekly"
            className={`radio text-center self-center py-4 px-5 rounded-lg cursor-pointer hover:opacity-75 ${isToggleOn ? "text-white bg-violet-300" : ""}`}
          >
            {PERIOD_TYPE.WEEKLY_KR}
          </label>
        </div>
        <div className="inline-flex rounded-lg">
          <input
            type="radio"
            name="period_unit"
            id="monthly"
            checked={!isToggleOn}
            onChange={() => handleToggleClick(PERIOD_TYPE.MONTHLY)}
            hidden
          />
          <label
            htmlFor="monthly"
            className={`radio text-center self-center py-4 px-5 rounded-lg cursor-pointer hover:opacity-75 ${isToggleOn ? "" : "text-white bg-violet-300"}`}
          >
            {PERIOD_TYPE.MONTHLY_KR}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChangePeriodToggleButton;

ChangePeriodToggleButton.propTypes = {
  periodUnit: PropTypes.string.isRequired,
  setPeriodUnit: PropTypes.func.isRequired,
};
