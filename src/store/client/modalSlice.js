const createModalSlice = (set) => ({
  modalList: [],
  addModal: (modalType) =>
    set((state) => ({ ...state, modalList: [...state.modalList, modalType] })),
  closeModal: (modalType) =>
    set((state) => ({ ...state, modalList: state.modalList.filter((name) => name !== modalType) })),
  clearModal: () => set((state) => ({ ...state, modalList: [] })),
});

export default createModalSlice;
