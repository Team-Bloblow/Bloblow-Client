import useBoundStore from "../../store/client/useBoundStore";
import ProfileIcon from "../Icon/ProfileIcon";
import CreateKeywordModal from "../Modal/CreateKeywordModal";
import Button from "../UI/Button";

const MyPageSidebar = () => {
  const userInfo = useBoundStore((state) => state.userInfo);
  const addModal = useBoundStore((state) => state.addModal);
  const modalList = useBoundStore((state) => state.modalList);

  const handleCreateKeywordButton = () => {
    addModal("createKeyword");
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
      {modalList.includes("createKeyword") && <CreateKeywordModal />}
    </aside>
  );
};

export default MyPageSidebar;
