import { useEffect } from "react";

const useScrollDisable = () => {
  useEffect(() => {
    const scrollY = window.scrollY;
    const hasScroll = document.documentElement.scrollHeight > document.documentElement.clientHeight;

    document.body.style.cssText = `
      position: fixed;
      top: -${scrollY}px;
      left: 0;
      right: 0;
      ${hasScroll && "overflow-y: scroll;"}
    `;

    return () => {
      document.body.style.cssText = "";
      window.scrollTo(0, scrollY);
    };
  }, []);
};

export default useScrollDisable;
