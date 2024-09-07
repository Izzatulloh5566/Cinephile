import close from "../../assets/images/close.svg";
import Btn from "../UI/Btn";
import { FC } from "react";
import { IData } from "../../Api/getData";
import Actors from "../UI/Actors";
import { actor } from "../../store/infoId";
interface IInfoblockProps {
    active: boolean
    setActive: (active: boolean) => void
    info: IData | null
    type: string
    actors: actor[]
}

const Infoblock: FC<IInfoblockProps> = ({ active, setActive, info, type, actors }) => {

    const img = import.meta.env.VITE_FULL_IMG
    if (info) {
        return (
            <div className={`infoblock ${active && 'active'}`}>
                <div className="infoblock_img">
                    <img src={img + info.backdrop_path} alt="" />
                </div>
                <button className="infoblock_close" onClick={() => setActive(false)}>
                    <img src={close} alt="" />
                </button>
                <div className="infoblock_descr">
                    <h2 className="infoblock_title">{type == 'movie' ? info.title : info.name}</h2>
                    <p className="infoblock_text">{info.overview}</p>
                    <div className="infoblock_content">
                        <span>{info.release_date}</span>
                        {info.genres.map(genr => (
                            <span key={genr.id}>{genr.name},</span>
                        ))}
                        <span>{
                            info.runtime ?
                                `${Math.floor(info.runtime / 60)}h ${info.runtime % 60}m `
                                : ''
                        }</span>
                    </div>
                    <div className="infoblock_actors">
                        {actors.slice(0, 4).map(actor => (
                            <Actors key={actor.id} actor={actor}/>
                        ))
                        }
                    </div>
                    <Btn type={type} id={info.id}/>
                </div>
            </div>
        )
    }
}

export default Infoblock