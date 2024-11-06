import { useEffect, useState } from "react";

const useDropDown = (refList) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    const modalRootElement = document.getElementById("modal");

    const checkOutsideClick = (e) => {
      let isOutsideClick = true;

      for (let i = 0; i < refList.length; i++) {
        if (e.target === refList[i].current) {
          isOutsideClick = false;
        }
      }

      if (isOutsideClick) {
        setIsDropDownOpen(false);
      }
    };
    modalRootElement.addEventListener("click", checkOutsideClick);

    return () => {
      modalRootElement.removeEventListener("click", checkOutsideClick);
    };
  }, [refList]);

  return [isDropDownOpen, setIsDropDownOpen];
};

export default useDropDown;
