import KeywordChip from "../Chip/KeywordChip";
import EditIcon from "../Icon/EditIcon";
import MinusCircleIcon from "../Icon/MinusCircleIcon";
import PlusCircleIcon from "../Icon/PlusCircleIcon";
import PropTypes from "prop-types";

const DashboardHeader = ({ userGroupList, groupId, specificKeywordData, keywordId }) => {
  const dashboardGroup = userGroupList?.find((groupInfo) => groupInfo._id === groupId);
  const dashboardGroupName = dashboardGroup?.name;
  const dashboardKeywordList = dashboardGroup?.keywordIdList;
  const dashboardKeyword = dashboardKeywordList?.find(
    (keywordInfo) => keywordInfo._id === keywordId
  );
  const dashboardKeywordName = dashboardKeyword?.keyword;

  const handleKeywordEditClick = () => {};

  return (
    <aside className="flex justify-between items-center w-full h-100 bg-white border-b-2 border-r-2 border-violet-50 shadow-sm px-20 py-10 flex-shrink-0">
      {keywordId ? (
        <div className="flex flex-col items-start gap-5">
          <div className="flex items-center gap-10 text-20 text-pink-900/90 font-bold">
            {dashboardKeywordName}
            <EditIcon className="size-20 cursor-pointer" onClick={handleKeywordEditClick} />
          </div>
          <div className="flex items-center gap-25">
            <div className="flex items-center gap-8">
              {/* 키워드 상세 조회 구현 후 추가 키워드 */}
              <PlusCircleIcon className="size-20 fill-teal-700" />
              {dashboardKeywordList.map((dashboardKeyword) => {
                const keywordId = dashboardKeyword._id;
                const keywordName = dashboardKeyword.keyword;

                return (
                  <KeywordChip
                    key={keywordId}
                    keywordName={keywordName}
                    styles="flex-center text-14 px-5 py-2 bg-orange-100 text-rose-800 rounded-[3px]"
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-8">
              {/* 키워드 상세 조회 구현 후 제외 키워드 */}
              <MinusCircleIcon className="size-20 fill-pink-600" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-5">
          <p className="text-20 text-pink-900/90 font-bold">{dashboardGroupName}</p>
          <div className="flex items-center gap-5">
            {dashboardKeywordList.map((dashboardKeyword) => {
              const keywordId = dashboardKeyword._id;
              const keywordName = dashboardKeyword.keyword;

              return (
                <KeywordChip
                  key={keywordId}
                  keywordName={keywordName}
                  styles="flex-center text-14 px-5 py-2 bg-orange-100 text-rose-800 rounded-[3px]"
                />
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};

export default DashboardHeader;

DashboardHeader.propTypes = {
  userGroupList: PropTypes.array.isRequired,
  groupId: PropTypes.string.isRequired,
  specificKeywordData: PropTypes.array,
  keywordId: PropTypes.string,
};
