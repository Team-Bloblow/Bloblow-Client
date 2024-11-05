import PropTypes from "prop-types";

const ProfileIcon = ({ size, photoURL }) => {
  return (
    <div
      className={`rounded-full overflow-hidden border-3 border-pink-200 hover:border-pink-300 ${size}`}
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