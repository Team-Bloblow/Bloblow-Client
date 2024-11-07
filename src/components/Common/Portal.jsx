import { createPortal } from "react-dom";

import PropTypes from "prop-types";

const Portal = ({ children, mountDomNode }) => {
  return createPortal(children, mountDomNode);
};

export default Portal;

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  mountDomNode: PropTypes.object.isRequired,
};
