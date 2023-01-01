import create from 'zustand';
// import { apiKey } from "../firebase/firebaseConfig";

export interface isLoginType {
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
}

export const useLoginStore = create<isLoginType>((set) => ({
  isLogin: false,
  setIsLogin: () => set(() => ({ isLogin: true })),
}));

// const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
// const isToken = sessionStorage.getItem(_session_key);
export const useTokenStore = create((set) => ({
  token: sessionStorage.getItem('access_token'),
}));
