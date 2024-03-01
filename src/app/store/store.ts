import { DateRange } from "react-day-picker";
import create from "zustand";

type Store = {
  date: DateRange | undefined;
  setDate: (newDate: DateRange) => void;
};

export const useStore = create<Store>((set) => ({
  date: undefined,
  setDate: (newDate: DateRange) => set(() => ({ date: newDate })),
}));

export default useStore;
