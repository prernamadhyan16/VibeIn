export const createAuthSlice = (set) => (
    {
        userInfo:{ email: null },
        setUserInfo: (userInfo) => set({ userInfo }),
    }
);