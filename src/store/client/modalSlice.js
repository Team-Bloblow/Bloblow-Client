const createModalSlice = (set) => ({
  openModalTypeList: [],
  addModal: (modalType) =>
    set((state) => ({ ...state, openModalTypeList: [...state.openModalTypeList, modalType] })),
  closeModal: (modalType) =>
    set((state) => ({
      ...state,
      openModalTypeList: state.openModalTypeList.filter((name) => name !== modalType),
    })),
  clearOpenModalTypeList: () => set((state) => ({ ...state, openModalTypeList: [] })),
});

export default createModalSlice;
