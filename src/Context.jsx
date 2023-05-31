// React
import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Context
export const AppContext = createContext();
export const NavContext = createContext();
export const FavoriteContext = createContext();

// Provider
export const AppContextProvider = ({children}) => {
    const [modalActive, setModalActive] = useState(false);
    const [enabledMobileNav, setEnabledMobileNav] = useState(false);
    const [showcaseLoading, setShowcaseLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const toggleModal = () => {
        setModalActive(!modalActive);
        if(enabledMobileNav){
            setEnabledMobileNav(false);
        }
    }
    
    const toggleMobileNav = () => {
        setEnabledMobileNav(!enabledMobileNav);
    }
    
    const values = {
        modalActive,
        toggleModal,
        setModalActive,
        enabledMobileNav,
        toggleMobileNav,
        showcaseLoading,
        setShowcaseLoading,
        searchParams,
        setSearchParams
    }
    
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export const NavContextProvider = ({children}) => {
    const typesData = ['Categories', 'Areas'];
    const [navItems, setNavItems] = useState({
        categories: [],
        areas: []
    });
    const [active, setActive] = useState(null);
    
    const addNavItem = (el, type) => {
        if(type === 'Categories'){
            setNavItems((prevState) => (
                {...prevState, categories: [...prevState.categories.filter(item => item !== el), el]}
            ));
        } else if(type === 'Areas'){
            setNavItems((prevState) => (
                {...prevState, areas: [...prevState.areas.filter(item => item !== el), el]}
            ));
        }   
    }

    const toggleList = (type) => {
        if(type === active){
            setActive(null);
            return;
        };
        setActive(type);
    }


    const values = {
        typesData,
        navItems,
        addNavItem,
        active,
        setActive,
        toggleList
    }
    
    return (
        <NavContext.Provider value={values}>
            {children}
        </NavContext.Provider>
    )
}

export const FavoriteContextProvider = ({children}) => {
    const [favoriteData, setFavoriteData] = useState(JSON.parse(localStorage.getItem('FavoriteItems')) || []);
    const [removeItems, setRemoveItems] = useState(JSON.parse(localStorage.getItem('RemoveItems')));

    const updFavoriteData = (id, setFavoriteItem) => {
        const findFavorite = favoriteData.find(favoriteId => favoriteId === id);
        findFavorite ? setFavoriteItem(true) : setFavoriteItem(false);
        localStorage.setItem('FavoriteItems', JSON.stringify(favoriteData));
    }

    const toggleFavorite = (id, isFavoriteItem) => {
        if(isFavoriteItem){
            setFavoriteData([...favoriteData.filter(favoriteId => favoriteId !== id)]);
        } else{
            setFavoriteData([...favoriteData, id]);
        }
    }

    const values = {
        updFavoriteData,
        favoriteData,
        setFavoriteData,
        toggleFavorite,
        removeItems,
        setRemoveItems
    }
    return (
        <FavoriteContext.Provider value={values}>
            {children}
        </FavoriteContext.Provider>
    )
}