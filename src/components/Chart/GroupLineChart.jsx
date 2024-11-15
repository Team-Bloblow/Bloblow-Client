import { Line } from "react-chartjs-2";

import { CHART_COLOR, GROUP_CHART_TYPE } from "../../config/constants";
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

const GroupLineChart = ({ groupChartType, chartData }) => {
  const data = {
    labels: chartData?.items[0]?.dates?.map((date) => changeMonthDateFormat(date)),
    datasets: chartData?.items?.map((keyword, index) => {
      let data;

      if (groupChartType === GROUP_CHART_TYPE.POST) {
        data = keyword.postCountList;
      } else if (groupChartType === GROUP_CHART_TYPE.LIKE) {
        data = keyword.likeCountList;
      } else if (groupChartType === GROUP_CHART_TYPE.COMMENT) {
        data = keyword.commentCountList;
      }

      return {
        label: keyword.name,
        data,
        borderColor: CHART_COLOR[index % 5],
        backgroundColor: CHART_COLOR[index % 5],
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
    maintainAspectRatio: true,
    aspectRatio: 2.6,

    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          padding: 11,
          boxWidth: 11,
          color: "#000000",
          usePointStyle: false,
          pointStyle: "circle",
          font: {
            family: "Pretendard",
            size: 12,
            lineHeight: 2,
            weight: "normal",
          },
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default GroupLineChart;

GroupLineChart.propTypes = {
  groupChartType: PropTypes.string.isRequired,
  chartData: PropTypes.shape({
    groupId: PropTypes.string.isRequired,
    keywordIdList: PropTypes.arrayOf(PropTypes.string).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        postCountList: PropTypes.arrayOf(PropTypes.number),
        likeCountList: PropTypes.arrayOf(PropTypes.number),
        commentCountList: PropTypes.arrayOf(PropTypes.number),
        dates: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
    hasPrevious: PropTypes.bool.isRequired,
    hasNext: PropTypes.bool.isRequired,
    cursorId: PropTypes.string.isRequired,
    previousCursorId: PropTypes.string.isRequired,
    nextCursorId: PropTypes.string.isRequired,
  }).isRequired,
};
