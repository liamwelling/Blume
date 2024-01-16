import create from 'zustand'

interface InvestorState {
  investorName: string;
  investorID: number;
  setInvestorID: (ID: number) => void;
  setInvestorName: (text: string) => void;
    // increase: (by: number) => void
}

const useInvestorStore = create<InvestorState>()((set) => ({
  investorName: 'Betty Murphy',
  investorID: 1,

  setInvestorName(text: string) {
    set((state) => ({
      ...state,
      investorName: text,
    }))
  },
  setInvestorID(ID: number) {
    set((state) => ({
      ...state,
      investorID: ID,
    }))
  }
}))
export default useInvestorStore