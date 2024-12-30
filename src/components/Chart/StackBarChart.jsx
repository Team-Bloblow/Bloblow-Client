import { Bar } from "react-chartjs-2";

import useViewportSize from "../../hooks/useViewportSize";
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
  const { width } = useViewportSize();
  const isBreakPoint = width < 768;

  const data = {
    labels: chartData.dates.map((date) => changeMonthDateFormat(date)),
    datasets: [
      {
        label: "광고 외 게시물",
        data: chartData.items.nonAdCountList,
        borderColor: "#13cc53",
        backgroundColor: "#13cc53",
      },
      {
        label: "광고 게시물",
        data: chartData.items.adCountList,
        borderColor: "#ffc728",
        backgroundColor: "#ffc728",
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
            size: isBreakPoint ? 11 : 13,
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
    keywordId: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired,
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
