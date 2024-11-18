import { Chart } from "react-chartjs-2";

import { changeMonthDateFormat } from "../../utils/date";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  plugins,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  plugins
);

const MultiTypeChart = ({ chartData }) => {
  const data = {
    labels: chartData.dates.map((date) => changeMonthDateFormat(date)),
    datasets: [
      {
        type: "line",
        label: "공감 수",
        data: chartData.items.likeCountList,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        type: "bar",
        label: "댓글 수",
        data: chartData.items.commentCountList,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192)",
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
        suggestedMax: Math.max(
          ...chartData.items.commentCountList,
          ...chartData.items.likeCountList
        ),
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

  return <Chart type="bar" data={data} options={options} />;
};

export default MultiTypeChart;

MultiTypeChart.propTypes = {
  chartData: PropTypes.shape({
    keywordId: PropTypes.string,
    keyword: PropTypes.string,
    cursorId: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.shape({
      likeCountList: PropTypes.arrayOf(PropTypes.number),
      commentCountList: PropTypes.arrayOf(PropTypes.number),
    }),
    previousCursorId: PropTypes.string,
    nextCursorId: PropTypes.string,
    hasPrevious: PropTypes.bool,
    hasNext: PropTypes.bool,
  }).isRequired,
};
