export const BASE_URL = "http://localhost:3000";

export const MODAL_TYPE = Object.freeze({
  CREATE_KEYWORD: "createKeyword",
  CREATE_KEYWORD_SUCCESS: "createKeywordSuccess",
  EDIT_KEYWORD_DASHBOARD: "editKeywordDashboard",
  ERROR: "error",
});

export const ERROR_MESSAGE = Object.freeze({
  MUST_GROUP_SELECT: "그룹을 선택해주세요.",
  NEW_GROUP_EMPTY_INPUT_VALUE: "그룹명을 입력해주세요.",
  KEYWORD_EMPTY_INPUT_VALUE: "키워드를 입력해주세요.",
  CREATE_KEYWORD_ERROR: "새로운 키워드 생성에 실패하였습니다.",
  SIGN_IN_ERROR: "로그인에 실패하였습니다.",
  FETCH_POSTS: "블로그 정보를 불러오지 못했습니다.",
});

export const POST_LISTS = Object.freeze({
  DEFAULT_INCLUDED_KEYWORD: "",
  LIMIT: 5,
  CURSOR_ID: "",
});
