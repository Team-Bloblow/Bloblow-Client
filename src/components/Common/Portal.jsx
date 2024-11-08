import { createPortal } from "react-dom";

import PropTypes from "prop-types";

const Portal = ({ children, currentRef }) => {
  const modalDivElement = document.getElementById("modal");

  return currentRef ? createPortal(children, currentRef) : createPortal(children, modalDivElement);
};

export default Portal;

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  currentRef: PropTypes.node,
};
