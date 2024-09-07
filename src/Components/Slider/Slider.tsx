import { FC, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import 'swiper/css/navigation';
import Infoblock from "../Infoblock/Infoblock";
import { getData } from "../../Api/getData";
import axiosClient from "../../Api/axiosClient";
import infoStore, { actor } from "../../store/infoId";
import { AxiosResponse } from "axios";
interface SliderProps {
    type: string
}
const Slider: FC<SliderProps> = ({ type }) => {
    const [active, setActive] = useState(false)
    const { data } = getData(type, 'popular', 1)
    const { setInfoMovie, setInfoTv, infoMovie, infoTv, setActors, actors } = infoStore()
    const img = import.meta.env.VITE_IMG
    const getInfo = async (id: number) => {
        setActive(false)
        setInfoMovie(null)
        setInfoTv(null)
        const res: AxiosResponse<any> = await axiosClient.get(`${type}/${id}`)
        const res2: { cast: actor[] } = await axiosClient.get(`${type}/${id}/credits`)
        const response = res2.cast.filter(actor => actor.profile_path)
        setActors(response)
        type == 'movie' ? setInfoMovie(res) : setInfoTv(res)
        setActive(true)
    }
    
    if (data) {
        return (
            <>
                <div className="slider">
                    <Link to={`/${type}`} className="slider_title">{type == 'movie' ? "Фильмы" : "Сереалы"} <span><RiArrowRightSLine /></span></Link>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={23}
                        grabCursor={true}
                        modules={[Navigation]}
                        navigation={true}
                        breakpoints={{
                            1700: {
                                slidesPerView: 5
                            },
                            1500: {
                                slidesPerView: 4.5
                            },
                            1300: {
                                slidesPerView: 4
                            },
                            1100: {
                                slidesPerView: 3.5
                            },
                            900: {
                                slidesPerView: 3.2
                            },
                            700: {
                                slidesPerView: 3,
                                spaceBetween: 15
                            },
                            500: {
                                slidesPerView: 2.5
                            },
                            400: {
                                slidesPerView: 2.2,
                                spaceBetween: 10
                            },
                            370: {
                                slidesPerView: 2
                            },
                            0: {
                                slidesPerView: 1.6
                            },
                        }}
                    >

                        {data.map(movie => (
                            <SwiperSlide key={movie.id} className="slider_slide" onClick={() => getInfo(movie.id)}>
                                <img src={img + movie.poster_path} alt="" />
                            </SwiperSlide>
                        ))}
                        <SwiperSlide className="slider_slide">
                            <Link to={`/${type}`} className="slider_slide_link">
                                <span><RiArrowRightSLine /></span>
                                <h3 className="slider_slide_title">Все {type == 'movie' ? "Фильмы" : "Сереалы"}</h3>
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <Infoblock actors={actors} type={type} active={active} setActive={setActive} info={type == 'movie' ? infoMovie : infoTv} />
            </>
        )
    }
}

export default Slider