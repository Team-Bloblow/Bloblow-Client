import createAuthSlice from "./authSlice";
import createModalSlice from "./modalSlice";
import { create } from "zustand";

export const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createModalSlice(...a),
}));

export default useBoundStore;
