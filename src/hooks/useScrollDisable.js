import { useEffect } from "react";

const useScrollDisable = () => {
  useEffect(() => {
    const scrollY = window.scrollY;

    if (scrollY > 0) {
      document.body.style.cssText = `
        position: fixed;
        top: -${scrollY}px;
        overflow-y: scroll;
      `;

      return () => {
        document.body.style.cssText = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, []);
};

export default useScrollDisable;
