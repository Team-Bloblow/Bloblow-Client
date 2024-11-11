export const MODAL_TYPE = Object.freeze({
  CREATE_KEYWORD: "createKeyword",
  CREATE_KEYWORD_SUCCESS: "createKeywordSuccess",
  ERROR: "error",
});

export const ERROR_MESSAGE = Object.freeze({
  NEW_GROUP_EMPTY_INPUT_VALUE: "그룹명을 입력해주세요.",
  KEYWORD_EMPTY_INPUT_VALUE: "키워드를 입력해주세요.",
  CREATE_KEYWORD_ERROR: "새로운 키워드 생성에 실패하였습니다.",
});

export const BASE_URL = "http://localhost:3000";

export const CHART_COLOR = Object.freeze(["#f1948a", "#c39bd3", "#85c1e9", "#7dcea0", "#f8c471"]);

export const PERIOD_TYPE = Object.freeze({
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  WEEKLY_KR: "주간",
  MONTHLY_KR: "월간",
});
