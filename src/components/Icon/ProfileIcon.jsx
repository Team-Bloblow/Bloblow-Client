import PropTypes from "prop-types";

const ProfileIcon = ({ size, photoURL }) => {
  return (
    <div
      className={`flex-shrink-0 rounded-full overflow-hidden border-1 border-slate-200/80 hover:border-slate-300 ${size}`}
    >
      <img src={photoURL} alt="프로필 사진" className="h-full w-full object-cover" />
    </div>
  );
};

export default ProfileIcon;

ProfileIcon.propTypes = {
  size: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
};
