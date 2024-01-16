import create from 'zustand'

interface LoginState {
  token: any
  setToken: (text: any) => void;
    // increase: (by: number) => void
}

const useLoginStore = create<LoginState>()((set) => ({
  token: null,
  setToken(text: string) {
    set((state) => ({
      ...state,
      token: text,
    }))
  }
}))
export default useLoginStore