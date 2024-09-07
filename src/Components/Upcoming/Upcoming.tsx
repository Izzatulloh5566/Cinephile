import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import { useRef, useState } from "react";
import { getData } from "../../Api/getData";
import Btn from "../UI/Btn";
import Loader from "../UI/Loader";



const Upcoming = () => {
    const { data } = getData('movie', 'upcoming', 1)

    const [next, setNext] = useState(1)
    const fullImg = import.meta.env.VITE_FULL_IMG
    const img = import.meta.env.VITE_IMG
    const line = useRef<HTMLElement>(null)
    const onAutoplayTimeLeft = (__: any, _: any, progress: number) => {
        if (line.current) {
            line.current.style.width = `${(1 - progress) * 100}%`
        }
    }

    if (data) {
        const changeSlide = () => {
            if (data.length - 1 == next) {
                setNext(0)
            } else {
                setNext(next + 1)
            }
        }
        return (
            <Swiper
                className="upcoming"
                loop={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false
                }}
                modules={[Autoplay, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                navigation={{ nextEl: ".upcoming_next" }}
                onSlideChangeTransitionEnd={changeSlide}
                breakpoints={{
                    0: {
                        allowTouchMove: true,
                        allowSlidePrev: false,
                    },
                    550: {
                        allowTouchMove: false
                    }
                }}

            >
                {data.map(movie => (
                    <SwiperSlide className="upcoming_slide" key={movie.id}>
                        <img src={`${fullImg}${movie.backdrop_path}`} alt="" />
                        <h1 className="upcoming_slide_title">{movie.title}</h1>
                        <p className="upcoming_slide_text">{movie.overview}</p>
                        <Btn type='movie' id={movie.id} />
                    </SwiperSlide>
                ))}

                <div className="upcoming_next">
                    <img src={`${img}${data[next].backdrop_path}`} alt="" />
                    <p className="upcoming_next_text">Следующий</p>
                    <h2 className="upcoming_next_title">{data[next].title}</h2>
                    <div className="upcoming_next_line">
                        <span ref={line}></span>
                    </div>
                </div>
            </Swiper>
        )
    }
    else return <Loader />

}

export default Upcoming