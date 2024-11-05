import useBoundStore from "../../store/client/useBoundStore";
import PropTypes from "prop-types";

const ModalBackground = ({ modalType, children }) => {
  const closeModal = useBoundStore((state) => state.closeModal);

  const handleModalBackgroundClick = () => {
    closeModal(modalType);
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex-center z-modal bg-black/60"
      onClick={handleModalBackgroundClick}
    >
      {children}
    </div>
  );
};

export default ModalBackground;

ModalBackground.propTypes = {
  modalType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
