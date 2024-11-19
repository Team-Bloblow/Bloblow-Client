import PropTypes from "prop-types";

const ChartSkeleton = ({ containerStyle, chartTitle, chartAspect }) => {
  return (
    <article className={containerStyle}>
      <span className="flex-shrink-0 bg-green-100/20 px-10 py-5 rounded-[2px]">{chartTitle}</span>
      <div className="flex-col-center gap-5 animate-pulse">
        <div className={`flex-shrink-0 w-full aspect-[${chartAspect}] bg-slate-200/60`} />
        <div className="w-235 h-35 bg-slate-200/60" />
      </div>
    </article>
  );
};

export default ChartSkeleton;

ChartSkeleton.propTypes = {
  containerStyle: PropTypes.string.isRequired,
  chartTitle: PropTypes.string.isRequired,
  chartAspect: PropTypes.string.isRequired,
};
