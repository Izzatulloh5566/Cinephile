import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axiosClient from "../../Api/axiosClient";
import infoStore, { actor } from "../../store/infoId";
import Actors from "../UI/Actors";
import { FaPlay } from "react-icons/fa";
import Video from "./Video";
import Recommend from "./Recommend";
import { IData } from "../../Api/getData";
import Loader from "../UI/Loader";

interface Props {
    type: string
}
const InfoId: FC<Props> = ({ type }) => {
    const [active, setActive] = useState(false)
    const [isload, setLoad] = useState(false)

    const { setKey, infoMovie, infoTv, setInfoMovie, setInfoTv, setActors, actors, setRecommend } = infoStore()
    const fullImg = import.meta.env.VITE_FULL_IMG
    const img = import.meta.env.VITE_IMG
    const { id } = useParams()
    const getInfoById = async () => {
        setLoad(true)
        const res = await axiosClient.get(`${type}/${id}`)
        const res2: { cast: actor[] } = await axiosClient.get(`${type}/${id}/credits`)
        const recommend: { results: IData[] } = await axiosClient.get(`${type}/${id}/recommendations`)
        const response = res2.cast.filter(actor => actor.profile_path)
        setActors(response)
        type == 'movie' ? setInfoMovie(res) : setInfoTv(res)
        setRecommend(recommend.results)
        setLoad(false)
    }
    useEffect(() => {
        getInfoById()
    }, [id])

    const info = type == 'tv' ? infoTv : infoMovie
    const getVideo = async (id: number) => {
        setActive(true)
        const res: { results: [{ key: string }] } = await axiosClient.get(`${type}/${id}/videos`)
        setKey(res.results[0].key)

    }


    if (info && !isload) {
        return (
            <>
                <div className="infoid">
                    <Video active={active} setActive={setActive} />
                    <div className="infoid_main infoblock_img">
                        <div className="infoid_main_bg">
                            <img src={fullImg + info.backdrop_path} alt="" />
                        </div>
                        <div className="infoid_main_img">
                            <img src={img + info.poster_path} alt="" />
                        </div>
                    </div>
                    <div className="infoblock_descr">
                        <h2 className="infoblock_title">{info.title || info.name}</h2>
                        <p className="infoblock_text">{info.overview}</p>
                        <div className="infoblock_content">
                            <span>{info.release_date}</span>
                            {info.genres.map(genr => (
                                <span key={genr.id}>{genr.name}</span>
                            ))}
                            <span>{
                                info.runtime ?
                                    `${Math.floor(info.runtime / 60)}h ${info.runtime % 60}m `
                                    : ''
                            }</span>
                        </div>
                        {type == 'movie' ?
                            <button className="infoid_btn" onClick={() => getVideo(info.id)}>
                                <FaPlay />
                                <span>Смотерть трейлер</span>
                            </button>
                            : null}
                    </div>
                    <div className="infoid_actors">
                        {
                            actors.slice(0, 6).map(actor => (
                                <Actors actor={actor} key={actor.id} />
                            ))
                        }
                    </div>
                </div>
                <div className="budget">
                    <div className="budget_card">
                        <h2 className="budget_title">Бюджет</h2>
                        <p className="budget_text">$185,000,000.00</p>
                    </div>
                    <div className="budget_card">
                        <h2 className="budget_title">Сборы</h2>
                        <p className="budget_text">$185,000,000.00</p>
                    </div>
                    <div className="budget_card">
                        <h2 className="budget_title">Статус</h2>
                        <p className="budget_text">Выпущено     </p>
                    </div>
                    <div className="budget_card">
                        <h2 className="budget_title">Исходное название</h2>
                        <p className="budget_text">Shang-Chi and the Legend of the Ten Rings</p>
                    </div>
                </div>
                <Recommend type={type} />
            </>
        )
    }
    else return <Loader />
}

export default InfoId