import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css/navigation';
import { Navigation } from "swiper/modules";
import { getData } from "../../Api/getData";
const Top = () => {
    const { data } = getData('movie', 'top_rated', 1)
    const img = import.meta.env.VITE_IMG
    return (
        <div className="top">
            <h2 className="top_title">ТОП <span>10</span></h2>
            <Swiper
                slidesPerView={3}
                navigation={true}
                modules={[Navigation]}
                className="top_swiper"
                spaceBetween={24}
                grabCursor={true}
                breakpoints={{
                    1300:{
                        slidesPerView:3
                    },
                    900:{
                        slidesPerView:2.8
                    },
                    800:{
                        slidesPerView:2.5
                    },
                    700:{
                        slidesPerView:2.3
                    },
                    600:{
                        slidesPerView:2.3,
                        spaceBetween:15
                    },
                    500:{
                        slidesPerView:2
                    },
                    400:{
                        slidesPerView:1.7,
                        spaceBetween:10
                    },
                    350:{
                        slidesPerView:1.5
                    },
                    300:{
                        slidesPerView:1.2
                    },
                   
                }}
            >
                {
                    data?.slice(0,10).map((movie,i) => (
                        <SwiperSlide className="top_slide" key={movie.id}>
                            <h3 className="top_slide_num">{i+1}</h3>
                            <div className="top_slide_img">
                                <img src={img+movie.poster_path} alt="" />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Top