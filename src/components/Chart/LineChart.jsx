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
  plugins,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, plugins);

const LineChart = ({ chartData }) => {
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
    aspectRatio: 2.3,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...chartData.items),
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          color: "#787878",
          usePointStyle: true,
          pointStyle: "rect",
          font: {
            family: "Pretendard",
            size: 13,
            weight: "normal",
          },
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default LineChart;

LineChart.propTypes = {
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
