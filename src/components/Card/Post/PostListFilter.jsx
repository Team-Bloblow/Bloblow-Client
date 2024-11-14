import { useState } from "react";

import { ERROR_MESSAGE } from "../../../config/constants";
import KeywordChip from "../../Chip/KeywordChip";
import Button from "../../UI/Button";
import Label from "../../UI/Label";
import PropTypes from "prop-types";

const PostListFilter = ({ filterList, setFilterList }) => {
  const [subKeywordListAdded, setSubKeywordListAdded] = useState({
    includedKeyword: filterList.includedKeyword,
    excludedKeyword: filterList.excludedKeyword,
  });
  const [inputValue, setInputValue] = useState({
    includedKeyword: "",
    excludedKeyword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    includedKeyword: "",
    excludedKeyword: "",
  });
  const handleSubKeywordInputChange = (e, subKeywordType) => {
    setInputValue((prev) => ({ ...prev, [subKeywordType]: e.target.value }));
    return;
  };
  const handleSubKeywordEnterSubmit = (e, subKeywordType) => {
    e.preventDefault();
    if (inputValue[subKeywordType]?.trim() === "") {
      return;
    }
    const hasSubKeyword = Object.values(subKeywordListAdded).some((subKeyword) =>
      subKeyword.includes(inputValue[subKeywordType])
    );
    if (hasSubKeyword) {
      setErrorMessage((prev) => ({
        ...prev,
        [subKeywordType]: ERROR_MESSAGE.KEYWORD_DUPLICATED_INPUT_VALUE,
      }));
      return;
    }

    setSubKeywordListAdded((prev) => ({
      ...prev,
      [subKeywordType]: [...prev[subKeywordType], inputValue[subKeywordType]],
    }));
    setInputValue((prev) => ({ ...prev, [subKeywordType]: "" }));
    setErrorMessage((prev) => ({ ...prev, [subKeywordType]: "" }));
    return;
  };
  const handleSubKeywordChipRemoveButtonClick = (subKeywordType, subKeywordNameForRemove) => {
    setSubKeywordListAdded((prev) => ({
      ...prev,
      [subKeywordType]: prev[subKeywordType].filter(
        (subKeywordName) => subKeywordName !== subKeywordNameForRemove
      ),
    }));
    return;
  };
  const handleFilterApplyButtonClick = () => {
    const isEqualQueryResult =
      Object.values(filterList).join() === Object.values(subKeywordListAdded).join();
    if (isEqualQueryResult) {
      alert("현재 검색 결과와 동일해요");
      return;
    }
    setFilterList(subKeywordListAdded);
    return;
  };
  return (
    <div className="relative w-full h-210">
      <div className="absolute top-0 right-20 w-8/12 h-40 my-15 px-15 border-2 font-semibold">
        <form onSubmit={(e) => handleSubKeywordEnterSubmit(e, "includedKeyword")}>
          <Label
            htmlFor="includedKeyword"
            styles="w-100 text-15 text-slate-700 font-semibold flex-shrink-0 hover:text-emerald-900/80"
          >
            포함
          </Label>
          {subKeywordListAdded?.includedKeyword?.map((subKeyword) => {
            return (
              <KeywordChip
                key={subKeyword}
                keywordName={subKeyword}
                hasCloseButton={true}
                onClick={() => handleSubKeywordChipRemoveButtonClick("includedKeyword", subKeyword)}
              />
            );
          })}
          <input
            type="text"
            id="includedKeyword"
            value={inputValue.includedKeyword}
            onChange={(e) => handleSubKeywordInputChange(e, "includedKeyword")}
            className="w-6/12 h-35 px-15 font-semibold outline-none"
            placeholder="어떤 키워드를 포함할까요?"
          />
        </form>
        <p className="text-15 text-red-400 h-18 font-semibold">{errorMessage.includedKeyword}</p>
      </div>
      <div className="absolute bottom-30 right-20 w-8/12 h-40 my-15 px-15 border-2 font-semibold">
        <form onSubmit={(e) => handleSubKeywordEnterSubmit(e, "includedKeyword")}>
          <Label
            htmlFor="excludedKeyword"
            styles="w-100 text-15 text-slate-700 font-semibold flex-shrink-0 hover:text-emerald-900/80"
          >
            제외
          </Label>
          {subKeywordListAdded?.excludedKeyword?.map((subKeyword) => {
            return (
              <KeywordChip
                key={subKeyword}
                keywordName={subKeyword}
                hasCloseButton={true}
                onClick={() => handleSubKeywordChipRemoveButtonClick("excludedKeyword", subKeyword)}
              />
            );
          })}
          <input
            type="text"
            id="excludedKeyword"
            value={inputValue.excludedKeyword}
            onChange={(e) => handleSubKeywordInputChange(e, "excludedKeyword")}
            className="w-6/12 h-35 px-15 font-semibold outline-none"
            placeholder="어떤 키워드를 제외할까요?"
          />
        </form>
        <p className="text-15 text-red-400 h-18 font-semibold">{errorMessage.excludedKeyword}</p>
      </div>
      <Button
        onClick={handleFilterApplyButtonClick}
        styles="absolute bottom-0 right-20 px-50 py-5 rounded-[5px] font-medium text-gray-900/80 border-t-2 border-b-2 border-slate-200/80 font-semibold hover:bg-emerald-100/10 hover:border-emerald-900/20"
      >
        필터 적용
      </Button>
    </div>
  );
};

export default PostListFilter;

PostListFilter.propTypes = {
  filterList: PropTypes.shape({
    includedKeyword: PropTypes.array.isRequired,
    excludedKeyword: PropTypes.array.isRequired,
  }),
  setFilterList: PropTypes.func.isRequired,
};
