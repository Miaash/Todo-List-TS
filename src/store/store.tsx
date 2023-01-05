import create from 'zustand';

export interface isLoginType {
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
}

export const useLoginStore = create<isLoginType>((set) => ({
  isLogin: false,
  setIsLogin: () => set(() => ({ isLogin: true })),
}));
