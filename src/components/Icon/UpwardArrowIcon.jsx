const UpwardArrowIcon = ({ ...props }) => {
  return (
    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 17L12 8"
        stroke="#e4004c"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 11L12 7L8 11"
        stroke="#e4004c"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpwardArrowIcon;
