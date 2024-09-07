import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IData } from "../Api/getData";


interface ISearchstore {
    search: string
    movie: null | IData[]
    setMovie: (data: IData[]) => void
    setSearch: (data: string) => void
}

const searchStore = create<ISearchstore>()(devtools(
    (set) => ({
        search: '',
        movie: null,
        setSearch: (data) => set({ search: data }),
        setMovie: (data) => set({ movie: data }),
    })
))
export default searchStore