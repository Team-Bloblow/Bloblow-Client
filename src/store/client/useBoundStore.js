import createAuthSlice from "./authSlice";
import createModalSlice from "./modalSlice";
import createUserDataSlice from "./userDataSlice";
import { create } from "zustand";

export const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createUserDataSlice(...a),
  ...createModalSlice(...a),
}));

export default useBoundStore;
