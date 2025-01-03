import { Line } from "react-chartjs-2";

import useViewportSize from "../../hooks/useViewportSize";
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
  const { width } = useViewportSize();
  const isBreakPoint = width < 768;

  const data = {
    labels: chartData.dates.map((date) => changeMonthDateFormat(date)),
    datasets: [
      {
        label: chartData.keyword,
        data: chartData.items,
        borderColor: "#4285f4",
        backgroundColor: "#4285f4",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: isBreakPoint ? 1.5 : 3,
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
            size: isBreakPoint ? 11 : 13,
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
    keywordId: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired,
    cursorId: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.arrayOf(PropTypes.number),
    previousCursorId: PropTypes.string,
    nextCursorId: PropTypes.string,
    hasPrevious: PropTypes.bool,
    hasNext: PropTypes.bool,
  }).isRequired,
};
