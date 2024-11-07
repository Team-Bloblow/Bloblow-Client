import PropTypes from "prop-types";

const Loading = ({ width, height, text }) => {
  return (
    <div className="flex-col-center">
      <img src="/assets/spinnerGif.gif" alt="로딩 이미지" width={width} height={height} />
      `${text}...💜`
    </div>
  );
};

export default Loading;

Loading.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  text: PropTypes.string,
};
