import { FC } from "react"
import { getData } from "../../Api/getData";
import Pagination from "./Pagination";
import infoStore from "../../store/infoId";
import Skleton from "./Skleton";
import { Link } from "react-router-dom";
interface ContentProps {
  type: string
}
const Content: FC<ContentProps> = ({ type }) => {
  const { page } = infoStore()
  const { data } = getData(type, 'popular', page)
  const img = import.meta.env.VITE_IMG
  const skleton = [...new Array(8)].map((_, i) => <Skleton key={i} />)
  return (
    <>
      <div className="content">
        {
          data ?
            data.map(movie => (
              <Link to={`/${type}Id/${movie.id}`} className="content_card" key={movie.id}>
                <img src={img + movie.poster_path} alt="" />
                <h3 className="content_title">{type == 'movie' ? movie.title : movie.name}</h3>
              </Link>
            ))
            : skleton
        }
      </div>
      <Pagination />
    </>

  )
}

export default Content