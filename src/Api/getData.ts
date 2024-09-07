import { QueryFunction, UseQueryResult, useQuery } from "@tanstack/react-query"
import axiosClient from "./axiosClient"


export interface IData {
    id: number
    poster_path: string
    backdrop_path: string
    title?: string
    name?: string
    overview: string
    release_date?: string
    genres: [{ id: number, name: string }]
    runtime: number
}
interface IRes {
    results: IData[]
}
const getInfo: QueryFunction<IData[]> = async ({ queryKey }) => {
    const type = queryKey[1]
    const info = queryKey[2]
    const page = queryKey[3]
    const response: IRes = await axiosClient.get(`${type}/${info}?page=${page}`)
    const res = response.results.filter(movie => movie.backdrop_path)
    return res
}
export const getData = function (type: string, info: string, page: number): UseQueryResult<IData[], Error> {
    return useQuery({ queryKey: ['upcoming', type, info, page], queryFn: getInfo })
}
