import { NavLink } from "react-router-dom"
import logo from "../../assets/images/Logo.svg";
import bars from "../../assets/images/bars.svg";
import close from "../../assets/images/close.svg";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
const Nav = () => {
  const [active, setActive] = useState(false)
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav_box">
          <NavLink to='/' className="nav_logo">
            <img src={logo} alt="" />
          </NavLink>
          <button className="nav_menu" onClick={()=>setActive(true)}>
            <img src={bars} alt="" />
          </button>
          <ul className={`nav_list ${active && 'active'}`}>
            <button className="nav_close" onClick={()=>setActive(false)}>
              <img src={close} alt="" />
            </button>
            <li>
              <NavLink to="/" className="nav_link">Главная</NavLink>
            </li>
            <li>
              <NavLink to="/movie" className="nav_link">Фильмы</NavLink>
            </li>
            <li>
              <NavLink to="/tv" className="nav_link">Сериалы</NavLink>
            </li>
            <li>
              <NavLink to="/search" className="nav_link ">
                <span><FaSearch /></span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav