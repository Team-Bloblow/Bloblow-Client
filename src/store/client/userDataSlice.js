const createUserDataSlice = (set) => ({
  isKeywordCrawling: false,
  userGroupList: [],
  error: {
    keywordCrawlingError: "",
  },
  setIsKeywordCrawling: (isPending) => set((state) => ({ ...state, isKeywordCrawling: isPending })),
  setUserGroupList: (groupList) => set((state) => ({ ...state, userGroupList: [...groupList] })),
});

export default createUserDataSlice;
