// React
import { useContext } from "react"

// Context
import { AppContext } from "../Context"

export function BurgerBtn(){
    const {enabledMobileNav, toggleMobileNav} = useContext(AppContext);

    return (
        <button onClick={toggleMobileNav} className={`header__burger-btn burger ${enabledMobileNav ? 'open' : ''}`} aria-label={enabledMobileNav ? 'Close navigation' : 'Open navigation'}>
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
        </button>
    )
}