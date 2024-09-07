import Slider from "../Components/Slider/Slider";
import Top from "../Components/Top/Top";
import Upcoming from "../Components/Upcoming/Upcoming"

const Home = () => {

  return (
    <>
      <Upcoming />
      <Slider type="movie" />
      <Slider type="tv" />
      <Top />
    </>
  )
}

export default Home