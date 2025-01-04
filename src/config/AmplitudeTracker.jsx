import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PAGE_TYPE = {
  HOME_PAGE: "home_page",
  SAMPLE_GROUP_PAGE: "sample_group_page",
  SAMPLE_KEYWORD_PAGE: "sample_keyword_page",
  MY_PAGE: "my_page",
  GROUP_PAGE: "group_page",
  KEYWORD_PAGE: "keyword_page",
};

const AmplitudeTracker = () => {
  const location = useLocation();
  const getViewdPageType = (pathname) => {
    const path = pathname.split("/").filter((path) => path !== "");

    switch (true) {
      case path.length === 0:
        return PAGE_TYPE.HOME_PAGE;

      case path[1] === "sample":
        return path[path.length - 1] === "sample"
          ? PAGE_TYPE.SAMPLE_GROUP_PAGE
          : PAGE_TYPE.SAMPLE_KEYWORD_PAGE;

      case path[0] === "myPage":
        return PAGE_TYPE.MY_PAGE;

      case path[0] === "dashboard" && path[1] !== "sample":
        if (path.length === 2) {
          return PAGE_TYPE.GROUP_PAGE;
        }
        if (path.length === 3) {
          return PAGE_TYPE.KEYWORD_PAGE;
        }
        return null;
    }
  };

  useEffect(() => {
    if (window.amplitude) {
      const pageType = getViewdPageType(location.pathname);

      if (pageType !== null) {
        window.amplitude.track("viewed_page", {
          title: pageType,
          path: location.pathname,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }, [location]);

  return null;
};

export default AmplitudeTracker;
