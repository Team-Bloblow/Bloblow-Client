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
  let maxData = 0;

  const data = {
    labels: chartData?.items[0]?.dates?.map((date) => changeMonthDateFormat(date)),
    datasets: chartData?.items?.map((keyword, index) => {
      let data;

      if (groupChartType === GROUP_CHART_TYPE.POST) {
        data = keyword.postCountList;
        maxData = Math.max(...data, maxData);
      } else if (groupChartType === GROUP_CHART_TYPE.LIKE) {
        data = keyword.likeCountList;
        maxData = Math.max(...data, maxData);
      } else if (groupChartType === GROUP_CHART_TYPE.COMMENT) {
        data = keyword.commentCountList;
        maxData = Math.max(...data, maxData);
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
        suggestedMax: maxData,
      },
    },
    maintainAspectRatio: true,
    aspectRatio: groupChartType === GROUP_CHART_TYPE.POST ? 3 : 1.9,

    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          color: "#000000",
          usePointStyle: true,
          pointStyle: "rect",
          font: {
            family: "Pretendard",
            size: 14,
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
