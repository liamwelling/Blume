import create from 'zustand'

interface UserState {
  userID: number;
  Username: string;
  Email: string;
  JWT: number;
  MyStocks: any[];
  MyInvestors: any[];
  deleteMyStocks: (stock: any) => void;
  deleteMyInvestors: (investorid: any) => void;
  setMyStocks: (stocks: any) => void;
  setMyInvestors: (investors: any) => void;
  setUsername: (username: string ) => void;
  setUserID: (ID: number) => void;
  setEmail: (email: string) => void;
    // increase: (by: number) => void
}

const useUserStore = create<UserState>()((set) => ({
  userID: 0,
  Username: '',
  Email: '',
  JWT: 0,
  MyStocks: [""],
  MyInvestors: [],
  setMyStocks(stocks: any) {
    set((state) => ({
      ...state,
      MyStocks: stocks,
    }))
  },
  setMyInvestors(investors: any) {
    set((state) => ({
      ...state,
      MyInvestors: investors,
    }))
  },
  deleteMyStocks: (stock: any) => 
  set((state) => ({ MyStocks: state.MyStocks.filter((myStock: any) => myStock != stock)})),
  setUsername(username: string) {
    set((state) => ({
      ...state,
      Username: username,
    }))
  },
  deleteMyInvestors: (investorid: any) => 
  set((state) => ({ MyInvestors: state.MyInvestors.filter((myinvestor: any) => myinvestor != investorid)})),

  setUserID(ID: number) {
    set((state) => ({
      ...state,
      userID: ID,
    }))
  },
  setEmail(email: string) {
    set((state) => ({
      ...state,
      Email: email,
    }))
  }
}))
export default useUserStore