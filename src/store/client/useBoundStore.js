import createAuthSlice from "./authSlice";
import { create } from "zustand";

export const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
}));

export default useBoundStore;
