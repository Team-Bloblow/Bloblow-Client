import { useEffect } from "react";

const useObserver = ({
  target,
  root = null,
  rootMargin = "0px 0px 0px 0px",
  threshold = 1.0,
  onIntersect,
}) => {
  useEffect(() => {
    let observer;

    if (target && target.current) {
      observer = new IntersectionObserver(
        (entries, observer) => {
          onIntersect(entries, observer);
        },
        {
          root,
          rootMargin,
          threshold,
        }
      );

      observer.observe(target.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [target, root, rootMargin, threshold, onIntersect]);
};

export default useObserver;
