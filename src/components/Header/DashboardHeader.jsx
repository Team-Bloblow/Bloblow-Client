import { useState } from "react";

import asyncPostKeywords from "../../api/crawl/asyncPostKeywords";
import asyncPutGroupName from "../../api/group/asyncPutGroupName";
import AlertModal from "../../components/Modal/AlertModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { ALERT_MESSAGE, CONFIRM_MESSAGE, ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import getDate from "../../utils/getDate";
import StartCrawlingButton from "../Button/StartCrawlingButton";
import KeywordChip from "../Chip/KeywordChip";
import CalendarIcon from "../Icon/CalendarIcon";
import EditIcon from "../Icon/EditIcon";
import UpdateIcon from "../Icon/UpdateIcon";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";
import Label from "../UI/Label";
import Loading from "../UI/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

const DashboardHeader = ({ userGroupList, userUid, groupId, specificKeywordData, keywordId }) => {
  const addModal = useBoundStore((state) => state.addModal);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);
  const dashboardGroup = userGroupList?.find((groupInfo) => groupInfo._id === groupId);
  const dashboardGroupName = dashboardGroup?.name;
  const dashboardKeywordList = dashboardGroup?.keywordIdList;
  const dashboardKeyword = dashboardKeywordList?.find(
    (keywordInfo) => keywordInfo._id === keywordId
  );
  const dashboardKeywordName = dashboardKeyword?.keyword;

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(dashboardGroupName);
  const queryClient = useQueryClient();
  const editGroupNameMutation = useMutation({
    mutationFn: (groupId, groupInfo) => asyncPutGroupName(groupId, groupInfo),
    onMutate: async ({ groupId, groupInfo }) => {
      await queryClient.cancelQueries({ queryKey: ["userGroupList", userUid] });
      const preGroupInfo = queryClient.getQueryData(["userGroupList", userUid]);
      const newGroupList = preGroupInfo.groupListResult.map((el) =>
        el._id === groupId ? { ...el, name: groupInfo.groupNewName } : el
      );
      const newGroupInfo = {
        ...preGroupInfo,
        groupListResult: newGroupList,
      };
      queryClient.setQueryData(["userGroupList", userUid], newGroupInfo);
      return { preGroupInfo, newGroupInfo };
    },
  });

  const startCrawlingMutation = useMutation({
    mutationFn: (keywordId) => asyncPostKeywords(keywordId),
  });

  const createdDate = getDate(specificKeywordData?.createdAt);
  const updatedDate = getDate(specificKeywordData?.updatedAt);

  const handleKeywordDelete = async () => {
    addModal(MODAL_TYPE.CONFIRM);
  };

  if (keywordId === undefined) {
    const handleEditGroupButtonClick = () => {
      if (isEditing === true) {
        const inputValueTrimed = inputValue.trim();

        if (inputValueTrimed === "") {
          return;
        }

        if (inputValueTrimed !== dashboardGroupName) {
          const groupInfo = {
            groupOwnerUid: userUid,
            groupNewName: inputValueTrimed,
          };

          editGroupNameMutation.mutate(
            { groupId, groupInfo },
            {
              onSuccess: (data) => {
                if (data?.message?.includes("Error occured")) {
                  setInputValue(dashboardGroupName);
                  return;
                }

                queryClient.invalidateQueries({ queryKey: ["userGroupList", userUid] });
                setIsEditing(!isEditing);
                return;
              },
              onError: () => {
                setInputValue(dashboardGroupName);
              },
            }
          );
        }
      }
      setIsEditing(!isEditing);
      return;
    };

    return (
      <aside className="flex justify-between items-center w-full md:h-100 h-full bg-white md:border-b-2 md:border-r-2 border-l-2 border-b-2 border-r-2 border-slate-200/80 shadow-sm px-20 md:py-5 py-10 flex-shrink-0">
        <div className="flex flex-col items-start gap-10 md:h-70 w-full h-full">
          <div className="relative flex items-center h-full">
            {!isEditing && (
              <>
                <p className="text-17 md:text-21 text-green-950 font-bold">{dashboardGroupName}</p>
                <Button styles="absolute -right-25 bottom-10" onClick={handleEditGroupButtonClick}>
                  <EditIcon className="size-18" />
                </Button>
              </>
            )}
            {isEditing && (
              <>
                <Label htmlFor="editGroupName"></Label>
                <input
                  type="text"
                  id="editGroupName"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="h-full w-250 px-10 mr-20 font-medium text-15 border-2 rounded outline-none py-5"
                  placeholder="변경할 그룹 이름을 입력해주세요"
                />
                <Button
                  styles="md:w-60 w-40 right-20 px-5 py-4 rounded-[5px] font-medium text-gray-900/80 bg-green-100 border-2 border-green-100 font-semibold hover:bg-green-200 md:text-16 text-12"
                  onClick={handleEditGroupButtonClick}
                >
                  저장
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            {dashboardKeywordList?.map((dashboardKeyword) => {
              const keywordId = dashboardKeyword._id;
              const keywordName = dashboardKeyword.keyword;

              return (
                <KeywordChip
                  key={keywordId}
                  keywordName={keywordName}
                  styles="flex-center text-12 md:text-14 px-5 py-2 bg-green-500/10 text-black rounded-[3px]"
                />
              );
            })}
          </div>
        </div>
      </aside>
    );
  }

  const handleStartCrawlingButtonClick = () => {
    startCrawlingMutation.mutate(keywordId);
  };

  return (
    <aside className="flex justify-between items-center w-full h-100 bg-white border-b-2 border-r-2 border-violet-50 shadow-sm px-20 py-10 flex-shrink-0">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col md:gap-5">
          <span className="flex items-center text-18 md:text-25 text-green-950 font-bold">
            {dashboardKeywordName}
          </span>
          <div className="flex items-center gap-5 md:mt-0 mt-10">
            <StartCrawlingButton
              isDisabled={startCrawlingMutation.isPending}
              onButtonClick={handleStartCrawlingButtonClick}
            />
            {startCrawlingMutation.isPending && <Loading width={25} height={25} />}
          </div>
        </div>
        <p className="flex flex-col md:gap-5 text-black text-15 font-light">
          <span className="flex items-center md:justify-start justify-end pt-2">
            <span className="hidden md:flex">
              <CalendarIcon className="size-18 fill-none mr-5 font-bold" />
              {`구독 시작일 : ${createdDate?.currentYear}년 ${createdDate?.currentMonth}월 ${createdDate?.currentDate}일`}
            </span>
            <Button
              styles="h-40 rounded-[4px] text-slate-500 item-center text-center md:text-15 text-13 font-medium md:ml-20 underline decoration-1"
              onClick={handleKeywordDelete}
            >
              구독 해지
            </Button>
          </span>
          <span className="flex items-center gap-5 pt-2 md:text-16 text-12">
            <UpdateIcon className="md:size-18 size-16" />
            <span className="hidden md:inline">마지막 업데이트일 :</span>
            <span>{`${updatedDate?.currentYear}년 ${updatedDate?.currentMonth}월 ${updatedDate?.currentDate}일`}</span>
          </span>
        </p>
      </div>
      {openModalTypeList.includes(MODAL_TYPE.CONFIRM) && (
        <ConfirmModal confirmMessage={CONFIRM_MESSAGE.DELETE_KEYWORD} confirmData={{ keywordId }} />
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ALERT && (
        <AlertModal
          alertMessage={ALERT_MESSAGE.DELETE_KEYWORD_SUCCESS}
          destination={`/dashboard/${groupId}`}
        />
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ERROR && (
        <ErrorModal errorMessage={ERROR_MESSAGE.DELETE_KEYWORD_ERROR} />
      )}
    </aside>
  );
};

export default DashboardHeader;

DashboardHeader.propTypes = {
  userGroupList: PropTypes.array.isRequired,
  userUid: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  specificKeywordData: PropTypes.object,
  keywordId: PropTypes.string,
};
