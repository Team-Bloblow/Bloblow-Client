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
      className="relative md:py-30 py-10 md:px-50 px-20 rounded-[5px] bg-white border-3 border-slate-200/80 hover:border-emerald-900/30"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      {hasCloseButton && (
        <Button
          styles="absolute md:top-15 top-10 md:right-17 right-13"
          onClick={handleCloseIconClick}
        >
          <CloseIcon className="size-35 md:size-40" />
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
