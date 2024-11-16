import { useEffect, useRef, useState } from "react";

import { ERROR_MESSAGE, POST_LISTS } from "../../../config/constants";
import useDropDown from "../../../hooks/useDropDown";
import KeywordChip from "../../Chip/KeywordChip";
import Button from "../../UI/Button";
import Label from "../../UI/Label";
import PropTypes from "prop-types";

const PostListFilter = ({ filterList, setFilterList }) => {
  const [tempFilterList, setTempFilterList] = useState({
    order: filterList.includedKeyword,
    includedKeyword: filterList.includedKeyword,
    excludedKeyword: filterList.excludedKeyword,
    isAd: filterList.isAd,
  });
  const [inputValue, setInputValue] = useState({
    includedKeyword: "",
    excludedKeyword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    includedKeyword: "",
    excludedKeyword: "",
  });
  const [openedDropDownType, setOpenedDropDownType] = useState("");
  const dropDownBoxRef = useRef(null);
  const dropDownBoxTextRef = useRef(null);
  const dropDownRefList = [dropDownBoxRef, dropDownBoxTextRef];
  const [isDropDownOpen, setIsDropDownOpen] = useDropDown(dropDownRefList, "dropDown");

  const selectedKeywordTypeInDropDownKR =
    openedDropDownType === "keyword-included"
      ? POST_LISTS.INCLUDED_KEYWORD
      : POST_LISTS.EXCLUDED_KEYWORD;
  const selectedKeywordTypeInDropDownEN =
    openedDropDownType === "keyword-included" ? "includedKeyword" : "excludedKeyword";
  const keywordFilterCount =
    tempFilterList.includedKeyword.length + tempFilterList.excludedKeyword.length;
  const getSelectedAdFilter = (adFilterType) => {
    switch (adFilterType) {
      case "":
        return POST_LISTS.ISAD_KR.ALL;
      case true:
        return POST_LISTS.ISAD_KR.ONLY_ADS;
      case false:
        return POST_LISTS.ISAD_KR.NO_ADS;
    }
  };

  useEffect(() => {
    setTempFilterList(() => ({
      order: filterList.order,
      includedKeyword: filterList.includedKeyword,
      excludedKeyword: filterList.excludedKeyword,
      isAd: filterList.isAd,
    }));
  }, [filterList.order, filterList.includedKeyword, filterList.excludedKeyword, filterList.isAd]);

  const handleDropDownClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const handleKeywordFilterInputChange = (e, keywordFilterType) => {
    setInputValue((prev) => ({ ...prev, [keywordFilterType]: e.target.value }));
    return;
  };
  const handleCreateTempKeywordFilterSubmit = (e, keywordFilterType) => {
    e.preventDefault();
    const trimmedInputValue = inputValue[keywordFilterType].trim();

    if (trimmedInputValue === "") {
      return;
    }
    const filterKeyword = new Set([
      ...tempFilterList.includedKeyword,
      ...tempFilterList.excludedKeyword,
    ]);
    const hasFilter = filterKeyword.has(trimmedInputValue);

    if (hasFilter) {
      setErrorMessage((prev) => ({
        ...prev,
        [keywordFilterType]: ERROR_MESSAGE.KEYWORD_DUPLICATED_INPUT_VALUE,
      }));
      return;
    }

    setTempFilterList((prev) => ({
      ...prev,
      [keywordFilterType]: [...prev[keywordFilterType], trimmedInputValue],
    }));
    setInputValue((prev) => ({ ...prev, [keywordFilterType]: "" }));
    setErrorMessage((prev) => ({ ...prev, [keywordFilterType]: "" }));
    return;
  };
  const handleKeywordFilterChipRemoveButtonClick = (keywordFilterType, keywordFilterForRemove) => {
    setTempFilterList((prev) => ({
      ...prev,
      [keywordFilterType]: prev[keywordFilterType].filter(
        (filter) => filter !== keywordFilterForRemove
      ),
    }));
    return;
  };
  const handleAllFilterApplyButtonClick = () => {
    const filters = Object.values(filterList).flat().sort();
    const tempFilters = Object.values(tempFilterList).flat().sort();
    const isEqualFilter = tempFilters.every((filter, index) => filter === filters[index]);

    if (isEqualFilter) {
      return;
    }

    setFilterList(tempFilterList);
    return;
  };
  const handleOrderDropDownClick = (sortType) => {
    if (tempFilterList.order === sortType) {
      return;
    }

    setTempFilterList((prev) => ({
      ...prev,
      order: sortType,
    }));
    return;
  };
  const handleAdFilterDropDownClick = (adFilterType) => {
    if (tempFilterList.isAd === adFilterType) {
      return;
    }

    setTempFilterList((prev) => ({
      ...prev,
      isAd: adFilterType,
    }));
    return;
  };

  return (
    <div className="flex flex-col gap-10 w-full px-20 py-10">
      <div className="relative" onClick={handleDropDownClick}>
        <ul className="flex gap-10" ref={dropDownBoxRef}>
          <Button
            styles="w-110 right-20 px-5 py-4 rounded-[5px] font-medium text-gray-900/80 border-2 border-slate-200/80 font-semibold hover:bg-emerald-100/10 hover:border-emerald-900/20"
            onClick={() => setOpenedDropDownType("order")}
          >
            {POST_LISTS.ORDER_KR[tempFilterList.order]}
          </Button>
          <Button
            styles="w-110 right-20 px-5 py-4 rounded-[5px] font-medium text-gray-900/80 border-2 border-slate-200/80 font-semibold hover:bg-emerald-100/10 hover:border-emerald-900/20"
            onClick={() => setOpenedDropDownType("keyword-included")}
          >
            {`키워드  ${keywordFilterCount}`}
          </Button>
          <Button
            styles="w-110 right-20 px-5 py-4 rounded-[5px] font-medium text-gray-900/80 border-2 border-slate-200/80 font-semibold hover:bg-emerald-100/10 hover:border-emerald-900/20"
            onClick={() => setOpenedDropDownType("ad")}
          >
            {getSelectedAdFilter(tempFilterList.isAd)}
          </Button>
          <Button
            onClick={handleAllFilterApplyButtonClick}
            styles="w-100 right-20 px-5 py-4 rounded-[5px] font-medium text-gray-900/80 border-2 border-slate-200/80 font-semibold hover:bg-emerald-100/10 hover:border-emerald-900/20 bg-green-100"
          >
            적용
          </Button>
        </ul>
        {openedDropDownType === "order" && (
          <div className="flex flex-col absolute w-170 top-40 p-15 gap-10 border-2 rounded-[5px] bg-white">
            <div>
              <span className="text-16 font-semibold">정렬</span>
            </div>
            <ul>
              <li ref={dropDownBoxTextRef}>
                <Button
                  styles=""
                  onClick={() => handleOrderDropDownClick(POST_LISTS.ORDER_EN.NEWEST)}
                >
                  <span>{POST_LISTS.ORDER_KR.NEWEST}</span>
                </Button>
              </li>
              <li ref={dropDownBoxTextRef}>
                <Button
                  styles=""
                  onClick={() => handleOrderDropDownClick(POST_LISTS.ORDER_EN.LIKE)}
                >
                  <span>{POST_LISTS.ORDER_KR.LIKE}</span>
                </Button>
              </li>
              <li ref={dropDownBoxTextRef}>
                <Button
                  styles=""
                  onClick={() => handleOrderDropDownClick(POST_LISTS.ORDER_EN.COMMENT)}
                >
                  <span>{POST_LISTS.ORDER_KR.COMMENT}</span>
                </Button>
              </li>
            </ul>
          </div>
        )}
        {openedDropDownType.includes("keyword") && (
          <div
            ref={dropDownBoxTextRef}
            className="flex flex-col absolute left-120 top-40 p-15 gap-10 w-400 border-2 rounded-[5px] bg-white"
          >
            <div>
              <span className="text-16 font-semibold">키워드 필터</span>
            </div>
            <div className="flex flex-row gap-20 p-1 w-full h-40 rounded-lg bg-gray-100">
              <Button
                styles={`flex-1 p-5 m-1 round-md ${openedDropDownType === "keyword-included" && "bg-white"}`}
                onClick={() => setOpenedDropDownType("keyword-included")}
              >
                <span>{POST_LISTS.INCLUDED_KEYWORD}</span>
              </Button>
              <Button
                styles={`flex-1 p-5 m-1 round-md ${openedDropDownType !== "keyword-included" && "bg-white"}`}
                onClick={() => setOpenedDropDownType("keyword-excluded")}
              >
                <span>{POST_LISTS.EXCLUDED_KEYWORD}</span>
              </Button>
            </div>
            <form
              className="w-full h-40 flex items-center gap-5 flex-shrink-0 border-2"
              onSubmit={(e) =>
                handleCreateTempKeywordFilterSubmit(e, selectedKeywordTypeInDropDownEN)
              }
            >
              <Label
                htmlFor={selectedKeywordTypeInDropDownEN}
                styles="text-15 text-slate-700 font-semibold flex-shrink-0 hover:text-emerald-900/80"
              ></Label>
              <input
                type="text"
                id={selectedKeywordTypeInDropDownEN}
                value={inputValue[selectedKeywordTypeInDropDownEN]}
                onChange={(e) => handleKeywordFilterInputChange(e, selectedKeywordTypeInDropDownEN)}
                className="w-full flex-grow-1 h-full px-10 font-semibold outline-none"
                placeholder={selectedKeywordTypeInDropDownKR}
              />
            </form>
            <ul>
              <div className="flex flex-wrap w-full h-full">
                {tempFilterList[selectedKeywordTypeInDropDownEN]?.map((keyword) => {
                  return (
                    <KeywordChip
                      key={keyword}
                      keywordName={keyword}
                      hasCloseButton={true}
                      onClick={() =>
                        handleKeywordFilterChipRemoveButtonClick(
                          selectedKeywordTypeInDropDownEN,
                          keyword
                        )
                      }
                      styles={`w-fit px-10 py-5 m-5 border-solid border-2 rounded-xl ${openedDropDownType === "keyword-included" ? "bg-green-100 border-green-200" : "bg-red-100 border-red-200"}`}
                    />
                  );
                })}
              </div>
            </ul>
          </div>
        )}
        {openedDropDownType === "ad" && (
          <div
            ref={dropDownBoxTextRef}
            className="flex flex-col absolute left-240 top-40 w-170 p-15 gap-10 border-2 rounded-[5px] bg-white"
          >
            <div>
              <span className="text-16 font-semibold">광고 필터</span>
            </div>
            <ul className="flex flex-col gap-10">
              <li className="p-5 rounded-md hover:bg-green-100">
                <Button
                  styles=""
                  onClick={() => handleAdFilterDropDownClick(POST_LISTS.ISAD_EN.ALL)}
                >
                  <span>{POST_LISTS.ISAD_KR.ALL}</span>
                </Button>
              </li>
              <li className="p-5 rounded-md hover:bg-green-100">
                <Button
                  styles=""
                  onClick={() => handleAdFilterDropDownClick(POST_LISTS.ISAD_EN.ONLY_ADS)}
                >
                  <span>{POST_LISTS.ISAD_KR.ONLY_ADS}</span>
                </Button>
              </li>
              <li className="p-5 rounded-md hover:bg-green-100">
                <Button
                  styles=""
                  onClick={() => handleAdFilterDropDownClick(POST_LISTS.ISAD_EN.NO_ADS)}
                >
                  <span>{POST_LISTS.ISAD_KR.NO_ADS}</span>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-15 w-full"></div>
        <p className="text-14 text-red-400 font-semibold">{errorMessage.includedKeyword}</p>
      </div>
      <p className="text-14 text-red-400 font-semibold">{errorMessage.excludedKeyword}</p>
    </div>
  );
};

export default PostListFilter;

PostListFilter.propTypes = {
  filterList: PropTypes.shape({
    order: PropTypes.string.isRequired,
    includedKeyword: PropTypes.arrayOf(PropTypes.string.isRequired),
    excludedKeyword: PropTypes.arrayOf(PropTypes.string.isRequired),
    isAd: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  }),
  setFilterList: PropTypes.func.isRequired,
};
