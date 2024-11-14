import PropTypes from "prop-types";

const RightCarouselIcon = ({ isDisabled }) => {
  return (
    <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" transform="rotate(0)">
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        {" "}
        <rect width="24" height="24" fill="none"></rect>{" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.5963 10.3318C16.8872 11.0694 16.8872 12.9307 15.5963 13.6683L11.154 16.2068C9.9715 16.8825 8.5002 16.0287 8.5002 14.6667L8.5002 9.33339C8.5002 7.97146 9.9715 7.11762 11.154 7.79333L15.5963 10.3318Z"
          fill={`${isDisabled ? "#cccccc" : "#323232"}`}
        ></path>{" "}
      </g>
    </svg>
  );
};

export default RightCarouselIcon;

RightCarouselIcon.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
};
