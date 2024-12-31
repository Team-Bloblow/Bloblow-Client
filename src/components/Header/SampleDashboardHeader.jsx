import AlertModal from "../../components/Modal/AlertModal";
import { ALERT_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import getDate from "../../utils/getDate";
import StartCrawlingButton from "../Button/StartCrawlingButton";
import KeywordChip from "../Chip/KeywordChip";
import CalendarIcon from "../Icon/CalendarIcon";
import EditIcon from "../Icon/EditIcon";
import UpdateIcon from "../Icon/UpdateIcon";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const SampleDashboardHeader = ({ groupName, keywordList, specificKeywordData, keywordId }) => {
  const addModal = useBoundStore((state) => state.addModal);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);

  const dashboardKeyword = keywordList?.find((keywordInfo) => keywordInfo._id === keywordId);
  const dashboardKeywordName = dashboardKeyword?.keyword;

  const createdDate = getDate(specificKeywordData?.createdAt);
  const updatedDate = getDate(specificKeywordData?.updatedAt);

  const handleKeywordDelete = async () => {
    addModal(MODAL_TYPE.ALERT);
  };

  if (keywordId === undefined) {
    const handleEditGroupButtonClick = () => {
      addModal(MODAL_TYPE.ALERT);
    };

    return (
      <aside className="flex justify-between items-center w-full md:h-100 h-full bg-white md:border-b-2 md:border-r-2 border-l-2 border-b-2 border-r-2 border-slate-200/80 shadow-sm px-20 md:py-5 py-10 flex-shrink-0">
        <div className="flex flex-col items-start gap-10 w-full md:h-70 h-full">
          <div className="relative first-letter:flex items-center h-full">
            <p className="md:text-21 text-green-950 font-bold">{groupName}</p>
            <Button styles="absolute -right-25 bottom-10" onClick={handleEditGroupButtonClick}>
              <EditIcon className="size-18" />
            </Button>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            {keywordList?.map((dashboardKeyword) => {
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
    addModal(MODAL_TYPE.ALERT);
  };

  return (
    <aside className="flex justify-between items-center w-full h-100 bg-white border-b-2 border-r-2 border-violet-50 shadow-sm px-20 py-10 flex-shrink-0">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col md:gap-5">
          <span className="flex items-center text-18 md:text-25 text-green-950 font-bold">
            {dashboardKeywordName}
          </span>
          <div className="flex items-center gap-5 md:mt-0 mt-10">
            <StartCrawlingButton onButtonClick={handleStartCrawlingButtonClick} />
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
          <span className="flex items-center pt-2 md:text-16 text-12">
            <UpdateIcon className="md:size-18 size-16 mr-5" />
            <span className="hidden md:inline">마지막 업데이트 일 : </span>
            {`${updatedDate?.currentYear}년 ${updatedDate?.currentMonth}월 ${updatedDate?.currentDate}일`}
          </span>
        </p>
      </div>
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ALERT && (
        <AlertModal alertMessage={ALERT_MESSAGE.SAMPLE} />
      )}
    </aside>
  );
};

export default SampleDashboardHeader;

SampleDashboardHeader.propTypes = {
  groupName: PropTypes.string.isRequired,
  keywordList: PropTypes.array.isRequired,
  specificKeywordData: PropTypes.object,
  keywordId: PropTypes.string,
};
