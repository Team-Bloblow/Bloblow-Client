import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

import PropTypes from "prop-types";

const ModalMount = ({ children }) => {
  const [mountNode, setMountNode] = useState(null);
  const modalElement = document.getElementById("modal");

  useLayoutEffect(() => {
    setMountNode(modalElement);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return mountNode ? createPortal(children, mountNode) : mountNode;
};

export default ModalMount;

ModalMount.propTypes = {
  children: PropTypes.node.isRequired,
};
