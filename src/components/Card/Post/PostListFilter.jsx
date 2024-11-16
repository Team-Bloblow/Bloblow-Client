import { useEffect, useState } from "react";

import { ERROR_MESSAGE } from "../../../config/constants";
import KeywordChip from "../../Chip/KeywordChip";
import Button from "../../UI/Button";
import Label from "../../UI/Label";
import PropTypes from "prop-types";

const PostListFilter = ({ filterList, setFilterList }) => {
  const [tempFilterList, setTempFilterList] = useState({
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

  useEffect(() => {
    setTempFilterList(() => ({
      includedKeyword: filterList.includedKeyword,
      excludedKeyword: filterList.excludedKeyword,
    }));
  }, [filterList.includedKeyword, filterList.excludedKeyword]);

  const handleFilterInputChange = (e, filterType) => {
    setInputValue((prev) => ({ ...prev, [filterType]: e.target.value }));
    return;
  };

  const handleCreateTempFilterSubmit = (e, filterType) => {
    e.preventDefault();
    const trimmedInputValue = inputValue[filterType].trim();

    if (trimmedInputValue === "") {
      return;
    }
    const hasFilter = Object.values(tempFilterList).some((filter) =>
      filter.includes(trimmedInputValue)
    );

    if (hasFilter) {
      setErrorMessage((prev) => ({
        ...prev,
        [filterType]: ERROR_MESSAGE.KEYWORD_DUPLICATED_INPUT_VALUE,
      }));
      return;
    }

    setTempFilterList((prev) => ({
      ...prev,
      [filterType]: [...prev[filterType], trimmedInputValue],
    }));
    setInputValue((prev) => ({ ...prev, [filterType]: "" }));
    setErrorMessage((prev) => ({ ...prev, [filterType]: "" }));
    return;
  };

  const handleRemoveFilterChipClick = (filterType, filterForRemove) => {
    setTempFilterList((prev) => ({
      ...prev,
      [filterType]: prev[filterType].filter((filter) => filter !== filterForRemove),
    }));
    return;
  };

  const handleFilterApplyButtonClick = () => {
    const filters = Object.values(filterList).flat().sort();
    const tempFilters = Object.values(tempFilterList).flat().sort();
    const isEqualFilter = tempFilters.every((filter, index) => filter === filters[index]);

    if (isEqualFilter) {
      return;
    }

    setFilterList(tempFilterList);
    return;
  };

  return (
    <div className="flex flex-col gap-10 w-full px-20 py-10">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-15 w-full">
          <form
            className="w-400 h-40 px-20 flex items-center gap-5 flex-shrink-0 border-2 rounded-md"
            onSubmit={(e) => handleCreateTempFilterSubmit(e, "includedKeyword")}
          >
            <Label
              htmlFor="includedKeyword"
              styles="text-15 text-slate-700 font-semibold flex-shrink-0 hover:text-emerald-900/80"
            >
              포함
            </Label>
            <input
              type="text"
              id="includedKeyword"
              value={inputValue.includedKeyword}
              onChange={(e) => handleFilterInputChange(e, "includedKeyword")}
              className="w-full flex-grow-1 h-full px-10 font-semibold outline-none"
              placeholder="포함할 키워드"
            />
          </form>
          <div className="flex items-center w-full h-full">
            {tempFilterList?.includedKeyword?.map((subKeyword) => {
              return (
                <KeywordChip
                  key={subKeyword}
                  keywordName={subKeyword}
                  hasCloseButton={true}
                  onClick={() => handleRemoveFilterChipClick("includedKeyword", subKeyword)}
                  styles="px-10 py-5 m-5 border-solid border-2 rounded-xl bg-green-100 border-green-200"
                />
              );
            })}
          </div>
        </div>
        <p className="text-14 text-red-400 font-semibold">{errorMessage.includedKeyword}</p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-15 w-full">
          <form
            className="w-400 h-40 px-20 flex items-center gap-5 flex-shrink-0 border-2 rounded-md"
            onSubmit={(e) => handleCreateTempFilterSubmit(e, "excludedKeyword")}
          >
            <Label
              htmlFor="excludedKeyword"
              styles="text-15 text-slate-700 font-semibold flex-shrink-0 hover:text-emerald-900/80"
            >
              제외
            </Label>
            <input
              type="text"
              id="excludedKeyword"
              value={inputValue.excludedKeyword}
              onChange={(e) => handleFilterInputChange(e, "excludedKeyword")}
              className="w-full flex-grow-1 h-full px-10 font-semibold outline-none"
              placeholder="제외할 키워드"
            />
          </form>
          <div className="flex items-center w-full h-full">
            {tempFilterList?.excludedKeyword?.map((subKeyword) => {
              return (
                <KeywordChip
                  key={subKeyword}
                  keywordName={subKeyword}
                  hasCloseButton={true}
                  onClick={() => handleRemoveFilterChipClick("excludedKeyword", subKeyword)}
                  styles="px-10 py-3 m-5 border-solid border-2 rounded-xl bg-red-100 border-red-200"
                />
              );
            })}
          </div>
        </div>
        <p className="text-14 text-red-400 font-semibold">{errorMessage.excludedKeyword}</p>
      </div>
      <Button
        onClick={handleFilterApplyButtonClick}
        styles="w-200 right-20 px-50 py-5 rounded-[5px] font-medium text-gray-900/80 border-2 border-slate-200/80 font-semibold hover:bg-emerald-100/10 hover:border-emerald-900/20"
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
