import { FC } from "react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
interface Props {
    type: string
    id: number
}
const Btn: FC<Props> = ({ type, id }) => {
    return (
        <Link to={`${type}Id/${id}`} className="btn">
            <span>  <HiOutlineBars3BottomLeft /></span>
            Подробнее
        </Link>
    )
}

export default Btn