import { FC } from "react"
import infoStore from "../../store/infoId"
import { IoCloseSharp } from "react-icons/io5";

interface VideoProps {
    active: boolean
    setActive: (active: boolean) => void
}
const Video: FC<VideoProps> = ({ active, setActive }) => {
    const { key, setKey } = infoStore()
    const delvideo = () => {
        setActive(false)
        setKey('')
    }

    const close = () => {
        setActive(false)
    }
    return (
        <div className={`video ${active && 'active'}`}>
            {
                key ?
                    <>
                        <button className="video_close" onClick={delvideo}>
                            <IoCloseSharp />
                        </button>
                        <iframe width="1000" height="500" src={`https://www.youtube.com/embed/${key}`}></iframe>
                    </>
                    :
                    <>
                        <button className="video_close" onClick={close}>
                            <IoCloseSharp />
                        </button>
                        <h2>Video is not defined</h2>
                    </>
            }
        </div>
    )
}

export default Video