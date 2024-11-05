import { useEffect, useState } from "react";

const useDropDown = (ref) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(
    function checkRefClick() {
      const checkOutsideClick = (e) => {
        if (e.target !== ref.current) {
          setIsDropDownOpen(false);
        }
      };

      window.addEventListener("click", checkOutsideClick);

      return () => {
        window.removeEventListener("click", checkOutsideClick);
      };
    },
    [ref]
  );

  return [isDropDownOpen, setIsDropDownOpen];
};

export default useDropDown;
