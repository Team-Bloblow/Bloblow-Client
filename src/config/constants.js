export const BASE_URL = "http://localhost:3000";

export const MODAL_TYPE = Object.freeze({
  CREATE_KEYWORD: {
    DEFAULT: "createKeyword",
    MY_PAGE: "myPage",
    DASHBOARD: "dashboard",
  },
  CREATE_KEYWORD_SUCCESS: "createKeywordSuccess",
  EDIT_KEYWORD_DASHBOARD: "editKeywordDashboard",
  ERROR: "error",
});

export const ERROR_MESSAGE = Object.freeze({
  MUST_GROUP_SELECT: "그룹을 선택해주세요.",
  NEW_GROUP_EMPTY_INPUT_VALUE: "그룹명을 입력해주세요.",
  KEYWORD_EMPTY_INPUT_VALUE: "키워드를 입력해주세요.",
  CREATE_KEYWORD_ERROR: "새로운 키워드 생성에 실패하였습니다.",
  KEYWORD_DUPLICATED_INPUT_VALUE: "이미 키워드가 필터로 등록되어 있어요.",
  SIGN_IN_ERROR: "로그인에 실패하였습니다.",
  FETCH_POSTS: "블로그 정보를 불러오지 못했습니다.",
});

export const CHART_COLOR = Object.freeze(["#f1948a", "#c39bd3", "#85c1e9", "#7dcea0", "#f8c471"]);

export const PERIOD_TYPE = Object.freeze({
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  WEEKLY_KR: "주간",
  MONTHLY_KR: "월간",
});

export const POST_LISTS = Object.freeze({
  DEFAULT_INCLUDED_KEYWORD: [],
  DEFAULT_EXCLUDED_KEYWORD: [],
  DEFAULT_LIMIT: 10,
  DEFAULT_CURSOR_ID: "",
});

export const SIGN_BUTTON_TYPE = Object.freeze({
  LANDING_PAGE: "landingPage",
});

export const SIGNATURE_COLOR = Object.freeze({
  START: "#00684A",
  VIA: "#009F55",
  TO: "#00ED64",
});
