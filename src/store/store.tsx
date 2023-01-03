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

export interface docIdType {
  //타입스크립트 사용 시 필요 (js라면 지우기)
  docId: string;
  setDocId: (docId: string) => void;
}

export const useDocId = create<docIdType>((set) => ({
  docId: '',
  setDocId: (docId) => set({ docId }),
}));
