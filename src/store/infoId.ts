import { create } from "zustand";
import { IData } from "../Api/getData";
import { devtools } from "zustand/middleware";

export type actor = { original_name: string, profile_path: string, id: number }

interface IInfoStore {
    infoMovie: null | IData
    infoTv: null | IData
    actors: actor[]
    page: number
    key: string
    recommend: null | IData[]
    setRecommend: (data: any) => void
    setInfoMovie: (data: any) => void
    setInfoTv: (data: any) => void
    setActors: (data: actor[]) => void
    setPage: (data: number) => void
    setKey: (key: string) => void

}
const infoStore = create<IInfoStore>()(devtools(
    (set) => ({
        infoMovie: null,
        infoTv: null,
        page: 1,
        key: '',
        actors: [{ original_name: '', profile_path: '', id: 0 }],
        recommend: null,
        setRecommend: (data) => set({ recommend: data }),
        setPage: (data) => set({ page: data }),
        setActors: (data) => set({ actors: data }),
        setInfoMovie: (data) => set({ infoMovie: data }),
        setInfoTv: (data) => set({ infoTv: data }),
        setKey: (data) => set({ key: data })
    })
))
export default infoStore