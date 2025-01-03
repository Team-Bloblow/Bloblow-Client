export const MODAL_TYPE = Object.freeze({
  CREATE_GROUP: "createGroup",
  CREATE_GROUP_SUCCESS: "createGroupSuccess",
  CREATE_KEYWORD: {
    DEFAULT: "createKeyword",
    MY_PAGE: "myPage",
    DASHBOARD: "dashboard",
  },
  CREATE_KEYWORD_SUCCESS: "createKeywordSuccess",
  EDIT_KEYWORD_DASHBOARD: "editKeywordDashboard",
  ERROR: "error",
  CONFIRM: "confirm",
  ALERT: "alert",
});

export const ERROR_MESSAGE = Object.freeze({
  MUST_GROUP_SELECT: "그룹을 선택해주세요.",
  NEW_GROUP_EMPTY_INPUT_VALUE: "그룹명을 입력해주세요.",
  KEYWORD_EMPTY_INPUT_VALUE: "키워드를 입력해주세요.",
  KEYWORD_EMPTY_INPUT_VALUE_LONG: "키워드를 15자 이하로 입력해주세요.",
  CREATE_KEYWORD_ERROR: "새로운 키워드 생성에 실패하였습니다.",
  KEYWORD_DUPLICATED_INPUT_VALUE: "이미 키워드가 필터로 등록되어 있어요.",
  FILTER_ALREADY_APPLIED: "이미 필터가 적용되었어요.",
  SIGN_IN_ERROR: "로그인에 실패하였습니다.",
  FETCH_POSTS: "블로그 정보를 불러오지 못했습니다.",
  DELETE_KEYWORD_ERROR: "키워드 구독 해지에 실패하였습니다.",
});

export const CONFIRM_MESSAGE = Object.freeze({
  DELETE_KEYWORD: "해당 키워드 구독을 해지하시겠습니까?",
});

export const ALERT_MESSAGE = Object.freeze({
  DELETE_KEYWORD_SUCCESS: "키워드를 구독 해지했습니다.",
  SAMPLE: "메인화면으로 이동하여 로그인 후 이용해주세요.",
});

export const CHART_COLOR = Object.freeze(["#4285f4", "#db4437", "#f4b400", "#0f9d58", "#ab47bc"]);

export const PERIOD_TYPE = Object.freeze({
  WEEKLY: "weekly",
  MONTHLY_DAILY: "monthlyDaily",
  MONTHLY_WEEKLY: "monthlyWeekly",
  WEEKLY_KR: "주간",
  MONTHLY_DAILY_KR: "월간(일)",
  MONTHLY_WEEKLY_KR: "월간(주)",
});

export const POST_LISTS = Object.freeze({
  ORDER_KR: {
    NEWEST: "최신 순",
    LIKE: "공감 많은 순",
    COMMENT: "댓글 많은 순",
  },
  ORDER_EN: {
    NEWEST: "NEWEST",
    LIKE: "LIKE",
    COMMENT: "COMMENT",
  },
  INCLUDED_KEYWORD: "포함할 키워드",
  EXCLUDED_KEYWORD: "제외할 키워드",
  IS_AD_KR: {
    ALL: "광고 포함",
    ONLY_ADS: "광고만",
    NO_ADS: "광고 제외",
  },
  ISAD_EN: {
    ALL: "",
    ONLY_ADS: true,
    NO_ADS: false,
  },
  DEFAULT_ORDER: "NEWEST",
  ISAD_KR: {
    ALL: "광고 포함",
    ONLY_ADS: "광고만",
    NO_ADS: "광고 제외",
  },
  DEFAULT_FILTER_LIST: {
    order: "NEWEST",
    includedKeyword: [],
    excludedKeyword: [],
    isAd: "",
  },
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

export const GROUP_CHART_TYPE = Object.freeze({
  POST: "주간 게시물 수 추이",
  LIKE: "주간 공감 수 추이",
  COMMENT: "주간 댓글 수 추이",
});

export const TEAM_INFO = Object.freeze({
  GITHUB: "https://github.com/Team-Bloblow",
  EMAIL: "ssongq92@gmail.com",
});

export const SIGNIN_BUTTON_TEXT = [
  "놓친 인사이트 발견하기",
  "키워드 구독하러 가기",
  "블로그 게시물 살펴보기",
];
