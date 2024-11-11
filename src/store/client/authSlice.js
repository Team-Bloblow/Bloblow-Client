import { auth } from "../../config/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

const createAuthSlice = (set) => ({
  isSignIn: false,
  userInfo: {
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
  },
  error: {
    googleSignInError: "",
    serverSignInError: "",
  },
  setIsSignIn: (isSignIn) => set((state) => ({ ...state, isSignIn })),
  setUserInfo: (userInfo) => set((state) => ({ ...state, userInfo })),
  setServerSignInError: (errorMessage) =>
    set((state) => ({ ...state, error: { serverSignInError: errorMessage } })),
  asyncSignIn: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const signInResponse = await signInWithPopup(auth, provider);
      const { uid, email, displayName, photoURL } = signInResponse.user;

      return { uid, email, displayName, photoURL };
    } catch ({ message }) {
      set((state) => ({ ...state, error: { googleSignInError: message } }));
    }
  },
  signOut: () => {
    const auth = getAuth();
    set((state) => ({
      ...state,
      isSignIn: false,
      userInfo: {
        uid: "",
        email: "",
        displayName: "",
        photoURL: "",
      },
    }));
    signOut(auth);
  },
});

export default createAuthSlice;
