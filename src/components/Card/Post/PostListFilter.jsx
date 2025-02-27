import { useEffect, useMemo, useRef, useState } from "react";

import { ERROR_MESSAGE, POST_LISTS } from "../../../config/constants";
import KeywordChip from "../../Chip/KeywordChip";
import FilterIcon from "../../Icon/FilterIcon";
import ResetIcon from "../../Icon/ResetIcon";
import SortIcon from "../../Icon/SortIcon";
import Button from "../../UI/Button";
import Label from "../../UI/Label";
import PropTypes from "prop-types";

const PostListFilter = ({ keywordId, filterList, setFilterList, resetFilterList }) => {
  const initialFilterList = useMemo(() => {
    return {
      order: filterList.order,
      includedKeyword: filterList.includedKeyword,
      excludedKeyword: filterList.excludedKeyword,
      isAd: filterList.isAd,
    };
  }, [filterList.order, filterList.includedKeyword, filterList.excludedKeyword, filterList.isAd]);
  const [tempFilterList, setTempFilterList] = useState(initialFilterList);
  const [inputValue, setInputValue] = useState({
    includedKeyword: "",
    excludedKeyword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    includedKeyword: "",
    excludedKeyword: "",
    aplliedFilter: "",
  });
  const [dropDownOpened, setDropDownOpened] = useState({
    isOpen: false,
    dropDownType: "",
  });
  const dropDownRef = useRef(null);
  const buttonInDropDownRef = useRef(null);

  const selectedKeywordTypeInDropDownKR =
    dropDownOpened.dropDownType === "keyword-included"
      ? POST_LISTS.INCLUDED_KEYWORD
      : POST_LISTS.EXCLUDED_KEYWORD;
  const selectedKeywordTypeInDropDownEN =
    dropDownOpened.dropDownType === "keyword-included" ? "includedKeyword" : "excludedKeyword";
  const keywordFilterCount =
    tempFilterList.includedKeyword.length + tempFilterList.excludedKeyword.length;

  const closeDropDown = () => {
    setDropDownOpened((prev) => ({
      ...prev,
      isOpen: false,
      dropDownType: "",
    }));
  };
  const getSelectedAdFilter = (adFilterType) => {
    switch (adFilterType) {
      case "":
        return POST_LISTS.IS_AD_KR.ALL;
      case true:
        return POST_LISTS.IS_AD_KR.ONLY_ADS;
      case false:
        return POST_LISTS.IS_AD_KR.NO_ADS;
    }
  };

  const vaildateEqualOriginalAndTempFilter = () => {
    const filters = Object.values(filterList).flat().sort();
    const tempFilters = Object.values(tempFilterList).flat().sort();

    if (filters.length !== tempFilters.length) {
      return false;
    }
    const isEqualFilter = tempFilters.every((filter, index) => filter === filters[index]);

    return isEqualFilter;
  };

  useEffect(() => {
    if (keywordId !== null && keywordId !== undefined) {
      setTempFilterList(() => initialFilterList);
    }
  }, [keywordId, initialFilterList]);

  useEffect(() => {
    const checkDropDownOutsideClicked = (e) => {
      if (dropDownOpened.isOpen && !dropDownRef?.current?.contains(e.target)) {
        setDropDownOpened((prev) => ({
          ...prev,
          isOpen: false,
          dropDownType: "",
        }));
        setErrorMessage({
          includedKeyword: "",
          excludedKeyword: "",
        });
        return;
      }
    };
    document.addEventListener("mousedown", checkDropDownOutsideClicked);

    return () => {
      document.removeEventListener("mousedown", checkDropDownOutsideClicked);
    };
  }, [dropDownOpened.isOpen]);

  const handleOpenDropDownClick = (type) => {
    setDropDownOpened((prev) => ({
      ...prev,
      isOpen: true,
      dropDownType: type,
    }));
    return;
  };
  const handleKeywordFilterInputChange = (e, keywordFilterType) => {
    setInputValue((prev) => ({ ...prev, [keywordFilterType]: e.target.value }));
    return;
  };
  const handleKeywordCreateTempFilterSubmit = (e, keywordFilterType) => {
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
      setInputValue({
        includedKeyword: "",
        excludedKeyword: "",
      });
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
      [keywordFilterType]: prev[keywordFilterType].filter(
        (filter) => filter !== keywordFilterForRemove
      ),
    }));
    return;
  };
  const handleOrderInDropDownClick = (sortType) => {
    if (tempFilterList.order === sortType) {
      closeDropDown();
      return;
    }

    setTempFilterList((prev) => ({
      ...prev,
      order: sortType,
    }));

    closeDropDown();
    return;
  };
  const handleAdFilterInDropDownClick = (adFilterType) => {
    if (tempFilterList.isAd === adFilterType) {
      closeDropDown();
      return;
    }

    setTempFilterList((prev) => ({
      ...prev,
      isAd: adFilterType,
    }));

    closeDropDown();
    return;
  };
  const handleAllFilterListsApplyButtonClick = () => {
    if (vaildateEqualOriginalAndTempFilter()) {
      setErrorMessage((prev) => ({
        ...prev,
        aplliedFilter: ERROR_MESSAGE.FILTER_ALREADY_APPLIED,
      }));
      return;
    }

    setFilterList(tempFilterList);
    setErrorMessage((prev) => ({
      ...prev,
      aplliedFilter: "",
    }));
    return;
  };
  const handleAllFilterListsResetButtonClick = () => {
    resetFilterList();
    setTempFilterList(initialFilterList);
    setErrorMessage((prev) => ({
      ...prev,
      aplliedFilter: "",
    }));
    return;
  };

  return (
    <div className="flex flex-col gap-10 w-full py-10 relative">
      <ul className="flex gap-10 md:flex-row flex-col">
        <div className="flex gap-10">
          <div>
            <Button
              styles="flex items-center w-120 md:h-full right-20 px-5 py-4 rounded-[5px] font-medium text-gray-900/80 border-2 border-slate-200/80 font-semibold hover:bg-emerald-100/10 hover:border-emerald-900/20"
              onClick={() => handleOpenDropDownClick("order")}
            >
              <div className="flex ml-5 mr-8">
                <SortIcon />
              </div>
              <span className="text-14">{POST_LISTS.ORDER_KR[tempFilterList.order]}</span>
            </Button>
          </div>
          <div>
            <Button
              styles="flex items-center w-100 md:h-full right-20 px-5 py-4 rounded-[5px] font-medium text-gray-900/80 border-2 border-slate-200/80 font-semibold hover:bg-emerald-100/10 hover:border-emerald-900/20"
              onClick={() => handleOpenDropDownClick("keyword-included")}
            >
              <div className="flex ml-5 mr-8">
                <FilterIcon />
              </div>
              <span className="text-14">{`키워드  ${keywordFilterCount}`}</span>
            </Button>
          </div>
          <div>
            <Button
              styles="flex items-center w-100 md:h-full right-20 px-5 py-4 rounded-[5px] font-medium text-gray-900/80 border-2 border-slate-200/80 font-semibold hover:bg-emerald-100/10 hover:border-emerald-900/20"
              onClick={() => handleOpenDropDownClick("ad")}
            >
              <div className="flex ml-5 mr-8">
                <FilterIcon />
              </div>
              <span className="text-14">{getSelectedAdFilter(tempFilterList.isAd)}</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <Button
            onClick={handleAllFilterListsApplyButtonClick}
            styles="md:w-60 w-50 right-20 px-5 py-4 rounded-[3px] font-medium text-white bg-[#03ae5d]/90 border-1 border-[#03ae5d]/90 font-semibold hover:bg-white hover:text-[#03ae5d]"
          >
            <span className="md:text-16 text-15">적용</span>
          </Button>
          <Button
            styles="flex items-center gap-5 ml-5"
            onClick={handleAllFilterListsResetButtonClick}
          >
            <ResetIcon className="text-gray-500" />
            <span className="text-14 text-gray-500">초기화</span>
          </Button>
          <div className="px-10 flex-center">
            <span className="font-light text-green-60">{errorMessage.aplliedFilter}</span>
          </div>
        </div>
      </ul>
      {dropDownOpened.dropDownType === "order" && (
        <div
          ref={dropDownRef}
          className="flex flex-col absolute w-170 top-50 p-15 gap-10 border-2 rounded-[5px] bg-white"
        >
          <div>
            <span className="text-16 font-semibold">정렬</span>
          </div>
          <ul ref={buttonInDropDownRef} className="flex flex-col gap-5">
            <li className="px-3 py-5 rounded-md hover:bg-gray-100">
              <Button
                styles="w-full text-left"
                onClick={() => handleOrderInDropDownClick(POST_LISTS.ORDER_EN.NEWEST)}
              >
                <span>{POST_LISTS.ORDER_KR.NEWEST}</span>
              </Button>
            </li>
            <li className="px-3 py-5 rounded-md hover:bg-gray-100">
              <Button
                styles="w-full text-left"
                onClick={() => handleOrderInDropDownClick(POST_LISTS.ORDER_EN.LIKE)}
              >
                <span>{POST_LISTS.ORDER_KR.LIKE}</span>
              </Button>
            </li>
            <li className="px-3 py-5 rounded-md hover:bg-gray-100">
              <Button
                styles="w-full text-left"
                onClick={() => handleOrderInDropDownClick(POST_LISTS.ORDER_EN.COMMENT)}
              >
                <span>{POST_LISTS.ORDER_KR.COMMENT}</span>
              </Button>
            </li>
          </ul>
        </div>
      )}
      {dropDownOpened.dropDownType.includes("keyword") && (
        <div
          ref={dropDownRef}
          className="flex flex-col absolute md:left-130 top-50 p-15 gap-10 md:w-400 w-350 border-2 rounded-[5px] bg-white"
        >
          <div>
            <span className="text-16 font-semibold">키워드 필터</span>
          </div>
          <div className="flex flex-row gap-1 p-1 w-full h-40 rounded-lg bg-gray-100">
            <Button
              styles={`flex-1 p-5 m-2 rounded-md ${dropDownOpened.dropDownType === "keyword-included" && "bg-white shadow-md"}`}
              onClick={() => handleOpenDropDownClick("keyword-included")}
            >
              <span>{POST_LISTS.INCLUDED_KEYWORD}</span>
            </Button>
            <Button
              styles={`flex-1 p-5 m-2 rounded-md ${dropDownOpened.dropDownType !== "keyword-included" && "bg-white shadow-md"}`}
              onClick={() => handleOpenDropDownClick("keyword-excluded")}
            >
              <span>{POST_LISTS.EXCLUDED_KEYWORD}</span>
            </Button>
          </div>
          <form
            className="w-full h-40 flex items-center gap-5 flex-shrink-0 border-2"
            onSubmit={(e) =>
              handleKeywordCreateTempFilterSubmit(e, selectedKeywordTypeInDropDownEN)
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
              className="w-full flex-grow-1 h-full px-10 font-light outline-none"
              placeholder={`${selectedKeywordTypeInDropDownKR} 입력 후 Enter를 눌러주세요`}
            />
          </form>
          <div className="flex flex-col gap-5">
            <p className="text-14 text-red-400 font-light">
              {errorMessage[selectedKeywordTypeInDropDownEN]}
            </p>
          </div>
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
                    styles={`w-fit px-10 py-5 m-5 border-solid border-2 rounded-xl font-medium ${dropDownOpened.dropDownType === "keyword-included" ? "bg-green-100 border-green-200" : "bg-red-100 border-red-200"}`}
                  />
                );
              })}
            </div>
          </ul>
        </div>
      )}
      {dropDownOpened.dropDownType === "ad" && (
        <div
          ref={dropDownRef}
          className="flex flex-col absolute md:left-240 left-170 top-50 w-170 p-15 gap-10 border-2 rounded-[5px] bg-white"
        >
          <div>
            <span className="text-16 font-semibold">광고 필터</span>
          </div>
          <ul ref={buttonInDropDownRef} className="flex flex-col">
            <li className="rounded-md hover:bg-gray-100">
              <Button
                styles="w-full px-3 py-10 text-left"
                onClick={() => handleAdFilterInDropDownClick(POST_LISTS.ISAD_EN.ALL)}
              >
                <span>{POST_LISTS.IS_AD_KR.ALL}</span>
              </Button>
            </li>
            <li className="rounded-md hover:bg-gray-100">
              <Button
                styles="w-full px-3 py-10 text-left"
                onClick={() => handleAdFilterInDropDownClick(POST_LISTS.ISAD_EN.ONLY_ADS)}
              >
                <span>{POST_LISTS.IS_AD_KR.ONLY_ADS}</span>
              </Button>
            </li>
            <li className="rounded-md hover:bg-gray-100">
              <Button
                styles="w-full px-3 py-10 text-left"
                onClick={() => handleAdFilterInDropDownClick(POST_LISTS.ISAD_EN.NO_ADS)}
              >
                <span>{POST_LISTS.IS_AD_KR.NO_ADS}</span>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostListFilter;

PostListFilter.propTypes = {
  keywordId: PropTypes.string.isRequired,
  filterList: PropTypes.shape({
    order: PropTypes.string.isRequired,
    includedKeyword: PropTypes.arrayOf(PropTypes.string.isRequired),
    excludedKeyword: PropTypes.arrayOf(PropTypes.string.isRequired),
    isAd: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  }),
  setFilterList: PropTypes.func.isRequired,
  resetFilterList: PropTypes.func.isRequired,
};
