export const MODAL_TYPE = Object.freeze({
  CREATE_KEYWORD: "createKeyword",
  EDIT_SUBKEYWORD: "editSubkeyword",
  CREATE_KEYWORD_SUCCESS: "createKeywordSuccess",
  ERROR: "error",
});

export const ERROR_MESSAGE = Object.freeze({
  NEW_GROUP_EMPTY_INPUT_VALUE: "그룹명을 입력해주세요.",
  KEYWORD_EMPTY_INPUT_VALUE: "키워드를 입력해주세요.",
  KEYWORD_DUPLICATED_INPUT_VALUE: "중복된 키워드가 있어요. 다른 키워드를 입력해주세요.",
  CREATE_KEYWORD_ERROR: "새로운 키워드 생성에 실패하였습니다.",
});

export const BASE_URL = "http://localhost:3000";
