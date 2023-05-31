// React
import { useState, useEffect, useRef, useContext } from "react";
// Assets
import { ReactComponent as ChevronDown } from "../assets/chevron-down.svg";
// Components
import { NavList } from "./NavList";
// Context
import { AppContext, NavContext } from "../Context";


export const NavItem = ({type}) => {
    const [onEnter, setOnEnter] = useState(false);
    const [searchWord, setSearchWord] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-2);
    const timeoutRef = useRef(null);
    const { navItems, active, setActive, toggleList } = useContext(NavContext);
    const { enabledMobileNav } = useContext(AppContext);
    const [navItemsArray, setNavItemsArray] = useState([]);

    useEffect(() => {
        if(enabledMobileNav){
            setActive(null);
        }
    }, [enabledMobileNav])

    const keyupFunc = (e) => {
        clearTimeout(timeoutRef.current);

        switch(e.keyCode){
            case 40:
                setActiveIndex((prevState) => prevState === -2 ? prevState + 2 : prevState + 1);
                break;
            case 38:
                setActiveIndex((prevState) => prevState - 1);
                break;
            default:
                setSearchWord((prevState) => [...prevState, e.key]);
                timeoutRef.current = setTimeout(() => {
                    setSearchWord([]);
                }, 800);
        }       
    }

    const disableScroll = (e) => {
        const keys = {38: 1, 40: 1};
        if(keys[e.keyCode]){
            e.preventDefault();
        }
    }

    useEffect(() => {
        if(type === 'Categories'){
            setNavItemsArray(navItems.categories);
        } else if(type === 'Areas'){
            setNavItemsArray(navItems.areas);
        }
    }, [navItems])

    useEffect(() => {
        if(onEnter){
            document.body.addEventListener('keyup', keyupFunc);
            document.body.addEventListener('keydown', disableScroll);   
        } else{
            setActiveIndex(-2);
        }

        return () => {
            document.body.removeEventListener('keyup', keyupFunc);
            document.body.removeEventListener('keydown', disableScroll);
        }
    }, [onEnter])

    useEffect(() => {
        for(let i = 0; i < navItemsArray.length; i++){
            const itemText = navItemsArray[i].textContent.toUpperCase();
            const inputText = searchWord.join('').toUpperCase();
            if(inputText.length === 0) return;
            if(itemText.includes(inputText)){
                navItemsArray[i].focus();
            } 
        }
    }, [searchWord])

    useEffect(() => {
        if(activeIndex === -2) return;
        
        if(activeIndex < 0){
            setActiveIndex(navItemsArray.length - 1);
            return;
        } else if(activeIndex === navItemsArray.length && onEnter){
            setActiveIndex(0);
            return;
        }
        if(activeIndex > -1){
            navItemsArray[activeIndex].focus()  
        }
    }, [activeIndex])

    return (
        <div onMouseEnter={() => setOnEnter(true)} onMouseLeave={() => setOnEnter(false)} onFocus={() => setOnEnter(true)} onBlur={() => setOnEnter(false)} className={`nav__item ${active === type ? 'active' : ''}`} tabIndex={0}>
            <div onClick={() => toggleList(type)} className="nav__item-title">
                <span className="nav__item-title-text">{type}</span>
                <ChevronDown className="nav__item-title-icon"/>
            </div>
            <NavList type={type}/>
        </div>
    )
}