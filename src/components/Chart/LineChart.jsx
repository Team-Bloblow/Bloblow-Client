import { Line } from "react-chartjs-2";

import { CHART_COLOR } from "../../config/constants";
import { changeMonthDateFormat } from "../../utils/date";
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const LineChart = ({ chartData }) => {
  const data = {
    labels: chartData.dates.map((date) => changeMonthDateFormat(date)),
    datasets: chartData.items.map((item, index) => {
      return {
        label: item.keyword,
        data: item.data,
        borderColor: CHART_COLOR[index],
        backgroundColor: CHART_COLOR[index],
      };
    }),
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default LineChart;

LineChart.propTypes = {
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
};
