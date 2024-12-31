import { useEffect, useState } from "react";

const useDropDown = (ref) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    const checkOutsideClick = (e) => {
      if (e.target !== ref.current) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener("click", checkOutsideClick);

    return () => {
      document.removeEventListener("click", checkOutsideClick);
    };
  }, [ref]);

  return [isDropDownOpen, setIsDropDownOpen];
};

export default useDropDown;
