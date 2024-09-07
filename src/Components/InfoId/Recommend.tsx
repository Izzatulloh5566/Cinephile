import { Link } from "react-router-dom"
import infoStore from "../../store/infoId"
import Skleton from "../Content/Skleton"
import { FC } from "react"
interface IProps {
  type: string
}
const Recommend: FC<IProps> = ({ type }) => {
  const skleton = [...new Array(8)].map((_, i) => <Skleton key={i} />)
  const { recommend } = infoStore()
  const img = import.meta.env.VITE_IMG
  return (
    <div className="container">
      <div className="content">
        {
          recommend ?
            recommend.slice(0, 4).map(movie => (
              <Link to={`/${type}Id/${movie.id}`} className="content_card" key={movie.id}>
                <img src={img + movie.poster_path} alt="" />
                <h3 className="content_title">{type == 'movie' ? movie.title : movie.name}</h3>
              </Link>
            ))
            : skleton
        }
      </div>
    </div>
  )
}
export default Recommend