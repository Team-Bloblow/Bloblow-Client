const createUserDataSlice = (set) => ({
  isKeywordCrawling: false,
  userGroupList: [],
  userDataError: {
    keywordCrawlingError: "",
  },
  setIsKeywordCrawling: (isPending) => set((state) => ({ ...state, isKeywordCrawling: isPending })),
  setUserGroupList: (groupList) => set((state) => ({ ...state, userGroupList: [...groupList] })),
});

export default createUserDataSlice;
