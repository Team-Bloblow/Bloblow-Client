import { Bar } from "react-chartjs-2";

import { CHART_COLOR } from "../../config/constants";
import { changeMonthDateFormat } from "../../utils/date";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  plugins,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Tooltip, plugins);

const BarChart = ({ chartData }) => {
  const data = {
    labels: chartData.dates.map((date) => changeMonthDateFormat(date)),
    datasets: [
      {
        label: chartData.keyword,
        data: chartData.items,
        borderColor: CHART_COLOR[0],
        backgroundColor: CHART_COLOR[0],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          font: {
            family: "Pretendard",
            size: 13,
            weight: "normal",
          },
        },
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;

BarChart.propTypes = {
  chartData: PropTypes.shape({
    keywordId: PropTypes.string,
    keyword: PropTypes.string,
    cursorId: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.arrayOf(PropTypes.number),
    previousCursorId: PropTypes.string,
    nextCursorId: PropTypes.string,
    hasPrevious: PropTypes.bool,
    hasNext: PropTypes.bool,
  }).isRequired,
};
