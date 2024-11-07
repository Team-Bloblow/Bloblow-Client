import useScrollDisable from "../../hooks/useScrollDisable";
import useBoundStore from "../../store/client/useBoundStore";
import PropTypes from "prop-types";

const ModalBackground = ({ isClear, modalType, children, isDataFetching }) => {
  const closeModal = useBoundStore((state) => state.closeModal);
  const clearModal = useBoundStore((state) => state.clearModal);

  const handleModalBackgroundClick = () => {
    if (isDataFetching) return;

    if (isClear) {
      clearModal();
    } else {
      closeModal(modalType);
    }
  };

  useScrollDisable();

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
  isClear: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isDataFetching: PropTypes.bool,
};
