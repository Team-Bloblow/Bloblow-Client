import { createAuthSlice } from "./createAuthSlice";
import { create } from "zustand";

const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
}));

export default useBoundStore;
