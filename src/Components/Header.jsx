// Assets
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Heart } from "../assets/heart.svg";
// React
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// Components
import { BurgerBtn } from "./BurgerBtn";
import { Nav } from "./Nav";
import { SearchForm } from "./SearchForm";
// Context
import { AppContext } from "../Context";


export function Header(){
    const [hideHeader, setHideHeader] = useState(false);
    let lastScrollPos;
    const {toggleModal, enabledMobileNav, toggleMobileNav} = useContext(AppContext);

    const closeMobileNav = (e) => {
        const burgerBtn = e.target.closest('.burger');
        const content = e.target.closest('.header__content');
        const favoriteCloseBtn = e.target.closest('.favorite__close-btn');
        if((burgerBtn || content || favoriteCloseBtn) == null){
            toggleMobileNav(false);
        }
    }

    const scrollFunc = (e) => {        
        if(lastScrollPos < window.pageYOffset){
            setHideHeader(true);
        } else{
            setHideHeader(false);
        }
        
        lastScrollPos = window.pageYOffset;
    }

    useEffect(() => {
        if(enabledMobileNav){
            window.addEventListener('click', closeMobileNav);
            document.body.style.overflow = 'hidden';
            document.body.classList.add('bg');
            document.querySelector('header').style.zIndex = 1000;
            
        } else {
            window.removeEventListener('click', closeMobileNav);
            document.body.style.overflow = 'auto';
            document.body.classList.remove('bg');        
        }

        return () => {
            window.removeEventListener('click', closeMobileNav);     
        }
    }, [enabledMobileNav])

    useEffect(() => {
        window.addEventListener('scroll', scrollFunc);
        return () => {
            window.removeEventListener('scroll', scrollFunc);
        }
    }, [])

    return (
        <header className={`header ${hideHeader ? 'hide' : ''}`}>
            <div className="header__inner">
                <BurgerBtn/>
                <Link to={"/"} className="header__link" aria-label="Go to page with recipes">
                    <Logo className="header__link-logo"/>
                </Link>
                <div className={`header__content ${enabledMobileNav ? 'active' : ''}`}>
                    <Nav/>
                    <div className="header__content-right">
                        <button onClick={toggleModal} className="header__favorite-btn btn btn--add-to-favorite" aria-label="Open favorites.">
                            <span className="header__favorite-btn-text">Saved Recipes</span>
                            <Heart/>
                        </button>
                        <SearchForm/>
                    </div>
                </div>
            </div>
        </header>
    )
}