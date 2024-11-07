import { MODAL_TYPE } from "../../config/const";
import useBoundStore from "../../store/client/useBoundStore";
import ProfileIcon from "../Icon/ProfileIcon";
import CreateKeywordModal from "../Modal/CreateKeywordModal";
import CreateKeywordSuccessModal from "../Modal/CreateKeywordSuccessModal";
import Button from "../UI/Button";

const MyPageSidebar = () => {
  const userInfo = useBoundStore((state) => state.userInfo);
  const addModal = useBoundStore((state) => state.addModal);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);

  const handleCreateKeywordButton = () => {
    addModal(MODAL_TYPE.CREATE_KEYWORD);
  };

  return (
    <aside className="flex flex-col gap-20">
      <div className="flex flex-col items-center gap-25 w-250 h-350 py-30 px-30 rounded-[30px] bg-white border-4 border-pink-200">
        <ProfileIcon size="w-165 h-165" photoURL={userInfo.photoURL} />
        <div className="w-full border-t-3 border-pink-200"></div>
        <div className="flex flex-col items-center w-full gap-10 text-pink-900/90">
          <p className="text-18 font-semibold">{userInfo.displayName}</p>
          <p>{userInfo.email}</p>
        </div>
      </div>
      <Button
        styles="w-full px-20 py-12 text-21 text-pink-900 font-bold bg-rose-100 border-2 border-rose-200/80 rounded-[20px] hover:bg-rose-200/80"
        onClick={handleCreateKeywordButton}
      >
        키워드 만들기
      </Button>
      {openModalTypeList.includes(MODAL_TYPE.CREATE_KEYWORD) && <CreateKeywordModal />}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.CREATE_KEYWORD_SUCCESS && (
        <CreateKeywordSuccessModal />
      )}
    </aside>
  );
};

export default MyPageSidebar;
