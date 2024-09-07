import { useEffect } from "react";
import axiosClient from "../Api/axiosClient";
import searchStore from "../store/search";
import { useDebounce } from "use-debounce";
import { IData } from "../Api/getData";
interface IRes {
  results: IData[]
}
const Search = () => {
  const img = import.meta.env.VITE_IMG
  const { movie, search, setMovie, setSearch } = searchStore()
  const [value] = useDebounce(search, 1000)
  const getSearch = async (value: string) => {
    const res: IRes = await axiosClient.get(`search/multi?page=1&query=${value}`)
    const response = res.results.filter(movie => movie.poster_path)
    setMovie(response)
  }
  useEffect(() => {
    getSearch(value)
  }, [value])

  return (
    <div className="movie">
      <div className="container">
        <input
          type="text"
          placeholder="Найти фильм, сериал..."
          className="input"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="content">
          {
            movie?.map(movie => (
              <div className="content_card">
                <img src={img + movie.poster_path} alt="" />
                <h3 className="content_title">{movie.title ? movie.title : movie.name}</h3>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Search