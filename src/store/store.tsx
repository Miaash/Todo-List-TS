import create from 'zustand';

interface isLoginType {
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
}

export const useLoginStore = create<isLoginType>((set) => ({
  isLogin: false,
  setIsLogin: () => set(() => ({ isLogin: true })),
}));

export const useTodoStore = create((set) => ({}));
