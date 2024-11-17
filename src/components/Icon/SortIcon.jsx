const SortIcon = ({ ...props }) => {
  return (
    <svg width="15px" height="15px" viewBox="0 0 25 25" className="flex items-center" {...props}>
      <path
        d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
        fill="none"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
      ></path>
    </svg>
  );
};

export default SortIcon;
