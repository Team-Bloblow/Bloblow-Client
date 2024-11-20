import { ALERT_MESSAGE, CONFIRM_MESSAGE, ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import getDate from "../../utils/getDate";
import KeywordChip from "../Chip/KeywordChip";
import CalendarIcon from "../Icon/CalendarIcon";
import UpdateIcon from "../Icon/UpdateIcon";
import AlertModal from "../Modal/AlertModal";
import ConfirmModal from "../Modal/ConfirmModal";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const DashboardHeader = ({ userGroupList, groupId, specificKeywordData, keywordId }) => {
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);
  const addModal = useBoundStore((state) => state.addModal);
  const dashboardGroup = userGroupList?.find((groupInfo) => groupInfo._id === groupId);
  const dashboardGroupName = dashboardGroup?.name;
  const dashboardKeywordList = dashboardGroup?.keywordIdList;
  const dashboardKeyword = dashboardKeywordList?.find(
    (keywordInfo) => keywordInfo._id === keywordId
  );
  const dashboardKeywordName = dashboardKeyword?.keyword;

  const createdDate = getDate(specificKeywordData?.createdAt);
  const updatedDate = getDate(specificKeywordData?.updatedAt);

  const isNotUpdated = specificKeywordData?.createdAt === specificKeywordData?.updatedAt;

  const handleKeywordDelete = async () => {
    addModal(MODAL_TYPE.CONFIRM);
  };

  if (keywordId === undefined) {
    return (
      <aside className="flex justify-between items-center w-full h-100 bg-white border-b-2 border-r-2 border-slate-200/80 shadow-sm px-20 py-10 flex-shrink-0">
        <div className="flex flex-col items-start gap-5">
          <p className="text-20 text-green-950 font-bold">{dashboardGroupName}</p>
          <div className="flex items-center gap-5">
            {dashboardKeywordList?.map((dashboardKeyword) => {
              const keywordId = dashboardKeyword._id;
              const keywordName = dashboardKeyword.keyword;

              return (
                <KeywordChip
                  key={keywordId}
                  keywordName={keywordName}
                  styles="flex-center text-14 px-5 py-2 bg-green-500/10 text-black rounded-[3px]"
                />
              );
            })}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex justify-between items-center w-full h-100 bg-white border-b-2 border-r-2 border-violet-50 shadow-sm px-20 py-10 flex-shrink-0">
      <div className="flex justify-between items-center w-full">
        <span className="flex items-center text-25 text-green-950 font-bold">
          {dashboardKeywordName}
        </span>
        <p className="flex flex-col gap-5 text-black text-15 font-light">
          <span className="flex items-center pt-2">
            <CalendarIcon className="size-18 fill-none mr-5 font-bold" />
            {`구독 시작일 : ${createdDate?.currentYear}년 ${createdDate?.currentMonth}월 ${createdDate?.currentDate}일`}
          </span>
          <span className="flex items-center pt-2">
            <UpdateIcon className="size-18 mr-5" />
            {`마지막 업데이트 일 : ${updatedDate?.currentYear}년 ${updatedDate?.currentMonth}월 ${updatedDate?.currentDate}일`}
          </span>
          <Button
            styles="w-80 h-30 rounded-[4px] item-center text-center border-1 border-slate-300 text-15 font-medium"
            onClick={handleKeywordDelete}
          >
            구독 해지
          </Button>
        </p>
      </div>
      {openModalTypeList.includes(MODAL_TYPE.CONFIRM) && (
        <ConfirmModal confirmMessage={CONFIRM_MESSAGE.DELETE_KEYWORD} confirmData={{ keywordId }} />
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ALERT && (
        <AlertModal alertMessage={ALERT_MESSAGE.DELETE_KEYWORD_SUCCESS} />
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
  groupId: PropTypes.string.isRequired,
  specificKeywordData: PropTypes.object,
  keywordId: PropTypes.string,
};
