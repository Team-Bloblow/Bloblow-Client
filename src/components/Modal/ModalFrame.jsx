import useBoundStore from "../../store/client/useBoundStore";
import CloseIcon from "../Icon/CloseIcon";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const ModalFrame = ({ isClear, hasCloseButton, modalType, children }) => {
  const closeModal = useBoundStore((state) => state.closeModal);
  const clearOpenModalTypeList = useBoundStore((state) => state.clearOpenModalTypeList);

  const handleCloseIconClick = () => {
    if (isClear) {
      clearOpenModalTypeList();
    } else {
      closeModal(modalType);
    }
  };

  return (
    <div
      className="relative py-30 px-50 rounded-[5px] bg-white border-3 border-slate-200/80 hover:border-slate-300/80"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      {hasCloseButton && (
        <Button styles="absolute top-15 right-17" onClick={handleCloseIconClick}>
          <CloseIcon className="size-40" />
        </Button>
      )}
    </div>
  );
};

export default ModalFrame;

ModalFrame.propTypes = {
  isClear: PropTypes.bool.isRequired,
  hasCloseButton: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
