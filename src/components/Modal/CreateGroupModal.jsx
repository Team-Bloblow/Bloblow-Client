import { MODAL_TYPE } from "../../config/constants";
import Portal from "../Common/Portal";
import Label from "../UI/Label";
import ModalBackground from "./ModalBackground";
import ModalFrame from "./ModalFrame";

const CreateGroupModal = () => {
  const handleNewGroupInputChange = () => {
    return;
  };
  const handleGroupSubmit = () => {
    return;
  };

  return (
    <Portal>
      <ModalBackground isClear={true} modalType={MODAL_TYPE.CREATE_GROUP}>
        <ModalFrame isClear={true} hasCloseButton={true} modalType={MODAL_TYPE.CREATE_GROUP}>
          <form className="w-500 flex-col-center gap-15" onSubmit={handleGroupSubmit}>
            <div className="w-full flex items-start gap-20">
              <Label
                htmlFor="newGroup"
                styles="w-100 text-20 text-slate-700 font-semibold flex-shrink-0 hover:text-emerald-900/80"
              >
                새로운 그룹
              </Label>
              <div className="flex flex-col justify-center gap-3 w-full">
                <input
                  type="text"
                  id="newGroup"
                  value={""}
                  onChange={handleNewGroupInputChange}
                  className="w-full h-40 px-15 border-2 border-black rounded-[5px] text-emerald-900 font-semibold"
                  placeholder="새롭게 추가할 그룹명을 입력해주세요"
                />
                <p className="text-12 text-red-500 h-18 font-semibold">{""}</p>
              </div>
            </div>
          </form>
        </ModalFrame>
      </ModalBackground>
    </Portal>
  );
};

export default CreateGroupModal;
