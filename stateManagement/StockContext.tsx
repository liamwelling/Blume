import create from 'zustand'

interface StockState {
  stockType: any
  stockTicker: any
  setStockTicker: (text: any) => void;
  setStockType: (text: any) => void;
    // increase: (by: number) => void
}

const useStockStore = create<StockState>()((set) => ({
  stockTicker: '',
  stockType: '',
  setStockTicker(text: any) {
    set((state) => ({
      ...state,
      stockTicker: text,
    }))
  },
  setStockType(text: any) {
    set((state) => ({
      ...state,
      stockType: text,
    }))
  }
}))
export default useStockStore