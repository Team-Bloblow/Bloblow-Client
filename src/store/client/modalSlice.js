const createModalSlice = (set) => ({
  modalList: [],
  addModal: (modalName) =>
    set((state) => ({ ...state, modalList: [...state.modalList, modalName] })),
  closeModal: (modalName) =>
    set((state) => ({ ...state, modalList: state.modalList.filter((name) => name !== modalName) })),
  clearModal: () => set((state) => ({ ...state, modalList: [] })),
});

export default createModalSlice;
