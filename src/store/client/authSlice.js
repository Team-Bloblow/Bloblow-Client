import { auth } from "../../config/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

const createAuthSlice = (set) => ({
  isSignIn: false,
  userInfo: {
    id: "",
    email: "",
    displayName: "",
    photoURL: "",
    joinedAt: null,
    lastSignInAt: null,
  },
  error: {
    signInError: "",
  },
  asyncSignIn: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      const { uid, email, displayName, photoURL } = response.user;

      set((state) => ({
        ...state,
        isSignIn: true,
        userInfo: { id: uid, email, displayName, photoURL },
      }));
    } catch ({ message }) {
      set((state) => ({ ...state, error: { signInError: message } }));
    }
  },
  signOut: () => {
    const auth = getAuth();
    set((state) => ({
      ...state,
      isSignIn: false,
      userInfo: {
        id: "",
        email: "",
        displayName: "",
        photoURL: "",
        joinedAt: null,
        lastSignInAt: null,
      },
    }));
    signOut(auth);
  },
});

export default createAuthSlice;
