// React
import { useContext, useEffect } from "react";

// Assets
import { ReactComponent as Close } from "../assets/close.svg";

// Context
import { AppContext, FavoriteContext } from "../Context";

// Components
import { FavoriteList } from "./FavoriteList";

export function Favorite(){
    const {modalActive, toggleModal, enabledMobileNav} = useContext(AppContext);
    const {favoriteData, setFavoriteData, removeItems, setRemoveItems} = useContext(FavoriteContext);


    const closeFavorite = (e) => {
        const favoriteModal = e.target.closest('.favorite');
        const openFavoriteBtn = e.target.closest('.header__favorite-btn');
        const toggleFavoriteBtn = e.target.closest('.favorite__list-item-btn-add');

        if((favoriteModal || openFavoriteBtn || toggleFavoriteBtn) === null){
            toggleModal();
        }
    }

    useEffect(() => {
        if(modalActive){
            window.addEventListener('click', closeFavorite);
            document.body.style.overflow = 'hidden';
            document.body.classList.add('bg');
            document.querySelector('header').style.zIndex = 998;
        } else{
            window.removeEventListener('click', closeFavorite);
            if(!enabledMobileNav){
                document.body.style.overflow = 'auto';
                document.body.classList.remove('bg');
            }
            setFavoriteData([...favoriteData.filter(item => !new Set(removeItems).has(item))]);
            setRemoveItems([]);
        }

        return () => {
            window.removeEventListener('click', closeFavorite);           
        }
    }, [modalActive])

    useEffect(() => {
        localStorage.setItem('FavoriteItems', JSON.stringify(favoriteData))
    }, [favoriteData])


    return (
        <div className={`favorite ${modalActive && 'show'}`}>
            <div className="favorite__header">
                <h4 className="favorite__header-text">Saved Recipes <span className="favorite__header-text-counter">{`(${removeItems ? favoriteData.length - removeItems.length : 0})`}</span></h4>             
            </div>
            <FavoriteList/>
            <button onClick={toggleModal} className="favorite__close-btn">
                <Close/>
            </button>
        </div>
    )
}