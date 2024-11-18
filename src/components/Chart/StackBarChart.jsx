import { Bar } from "react-chartjs-2";

import { changeMonthDateFormat } from "../../utils/date";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  plugins,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins);

const StackBarChart = ({ chartData }) => {
  const data = {
    labels: chartData.dates.map((date) => changeMonthDateFormat(date)),
    datasets: [
      {
        label: "광고 없음",
        data: chartData.items.nonAdCountList,
        borderColor: "#0f9d58",
        backgroundColor: "#0f9d58",
      },
      {
        label: "광고 있음",
        data: chartData.items.adCountList,
        borderColor: "#f4b400",
        backgroundColor: "#f4b400",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        suggestedMax: Math.max(...chartData.items.nonAdCountList, ...chartData.items.adCountList),
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

  return <Bar options={options} data={data} />;
};

export default StackBarChart;

StackBarChart.propTypes = {
  chartData: PropTypes.shape({
    keywordId: PropTypes.string,
    keyword: PropTypes.string,
    cursorId: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.shape({
      adCountList: PropTypes.arrayOf(PropTypes.number),
      nonAdCountList: PropTypes.arrayOf(PropTypes.number),
    }),
    previousCursorId: PropTypes.string,
    nextCursorId: PropTypes.string,
    hasPrevious: PropTypes.bool,
    hasNext: PropTypes.bool,
  }).isRequired,
};
