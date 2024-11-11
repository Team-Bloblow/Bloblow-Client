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
      <div className="flex lg:flex-col items-center gap-25 w-full lg:w-250 h-100 lg:h-350 px-30 lg:px-30 py-10 lg:py-30 rounded-[30px] bg-white border-4 border-pink-200 flex-grow lg:flex-grow-0 shadow-sm">
        <ProfileIcon size="w-70 h-70 lg:w-165 lg:h-165" photoURL={userInfo.photoURL} />
        <div className="hidden lg:block w-full border-t-3 border-pink-200"></div>
        <div className="flex flex-col md:flex-row lg:flex-col justify-center lg:justify-start items-center w-full gap-10 md:gap-30 lg:gap-10 text-pink-900/90">
          <p className="text-18 font-semibold">{userInfo.displayName}</p>
          <p className="text-18 lg:text-16">{userInfo.email}</p>
        </div>
      </div>
      <Button
        styles="w-300 lg:w-full px-10 lg:px-20 lg:py-22 text-21 text-pink-900/80 font-bold bg-rose-50 border-2 border-rose-200/80 rounded-[20px] hover:bg-rose-100/80 shadow-sm"
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
