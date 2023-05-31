// React
import { useEffect, useRef, useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom";

// Context
import { NavContext, AppContext } from "../Context";

export function NavListItem({str, type}){
    const [focus, setFocus] = useState(false);
    const {addNavItem} = useContext(NavContext);
    const ref = useRef(null);
    const {toggleMobileNav, setSearchParams} = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (e) => {
        if(location.pathname === '/'){
            setSearchParams(type === "Categories" ? {category: str} : {area: str});
        } else{
            navigate("/", {replace: true, state: type === "Categories" ? {category: str} : {area: str}})
        }
        
        if(window.innerWidth <= 826){
            toggleMobileNav();
        }
        e.target.blur();
    }


    useEffect(() => {
        ref.current && addNavItem(ref.current, type);
    }, [])

    return (
        <li className={`nav__list-item ${focus ? 'focus' : ''}`}>
            <a ref={ref} onClick={handleClick} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className="nav__list-item-link" tabIndex={0}>{str}</a>
        </li>
    )
}