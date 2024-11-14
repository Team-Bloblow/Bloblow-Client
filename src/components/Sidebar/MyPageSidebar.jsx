import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import ProfileIcon from "../Icon/ProfileIcon";
import CreateKeywordModal from "../Modal/CreateKeywordModal";
import CreateKeywordSuccessModal from "../Modal/CreateKeywordSuccessModal";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";

const MyPageSidebar = () => {
  const userInfo = useBoundStore((state) => state.userInfo);
  const addModal = useBoundStore((state) => state.addModal);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);

  const handleCreateKeywordButton = () => {
    addModal(MODAL_TYPE.CREATE_KEYWORD.DEFAULT);
  };

  return (
    <aside className="flex gap-20 w-full px-30 lg:px-0 lg:w-fit lg:flex-col">
      <div className="flex lg:flex-col items-center gap-25 w-full lg:w-220 h-100 lg:h-320 px-30 lg:px-30 py-10 lg:py-20 rounded-[8px] bg-white border-2 border-slate-200/80 flex-grow lg:flex-grow-0 shadow-sm">
        <ProfileIcon size="w-70 h-70 lg:w-155 lg:h-155" photoURL={userInfo.photoURL} />
        <div className="hidden lg:block w-full border-t-3 border-slate-200"></div>
        <div className="flex flex-col md:flex-row lg:flex-col justify-center lg:justify-start items-center w-full gap-10 md:gap-30 lg:gap-10 text-black">
          <p className="text-18 font-semibold">{userInfo.displayName}</p>
          <p className="text-18 lg:text-16">{userInfo.email}</p>
        </div>
      </div>
      <Button
        styles="w-300 lg:w-full px-10 lg:px-20 lg:py-18 text-21 text-gray-900/80 font-bold border-2 border-slate-200/80 rounded-[8px] shadow-sm hover:shadow-md hover:bg-emerald-200/10 hover:border-emerald-900/30"
        onClick={handleCreateKeywordButton}
      >
        키워드 만들기
      </Button>
      {openModalTypeList.includes(MODAL_TYPE.CREATE_KEYWORD.DEFAULT) && (
        <CreateKeywordModal createType={MODAL_TYPE.CREATE_KEYWORD.MY_PAGE} />
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.CREATE_KEYWORD_SUCCESS && (
        <CreateKeywordSuccessModal />
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ERROR && (
        <ErrorModal errorMessage={ERROR_MESSAGE.CREATE_KEYWORD_ERROR} />
      )}
    </aside>
  );
};

export default MyPageSidebar;
