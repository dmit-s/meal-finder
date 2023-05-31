// React
import { useContext, useState, useEffect } from "react";
import { Link, Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
// Api
import { getMealById } from "../api";
// Assets
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as HeartFilled } from "../assets/heart-filled.svg";
// Context
import { FavoriteContext } from "../Context";

export function FavoriteListItem({id}){
    const [mealData, setMealData] = useState([]);
    const {removeItems, setRemoveItems} = useContext(FavoriteContext);
    const [isFavoriteItem, setFavoriteItem] = useState(removeItems.find(favoriteId => favoriteId === id) ? false : true);
    const {strMeal, strMealThumb} = mealData;
    const [isGhost, setGhost] = useState(false);
    
    useEffect(() => {
        getMealById(id).then(data => {
            if(data.meals){
                setMealData(data.meals[0]);
            }
        })
    }, [])

    const handleClick = () => {
        setGhost(!isGhost);
        const removeItem = removeItems.find(item => item === id);
        if(removeItem){
            setFavoriteItem(true);
            setRemoveItems([...removeItems.filter(item => item !== id)]);
        } else{
            setFavoriteItem(false);
            setRemoveItems([...removeItems, id]);
        }
    }
    

    return (
        <li className={`favorite__list-item ${isGhost ? 'ghost' : ''}`}>
            <Link to={id} className="favorite__list-item-link">
                <div className="favorite__list-item-img">
                    <img src={strMealThumb} alt={strMeal}/>
                </div>
                <p className="favorite__list-item-name">{strMeal}</p>
            </Link>
            <button onClick={handleClick} className={`favorite__list-item-btn-add btn btn--add-to-favorite ${isFavoriteItem ? 'active' : ''}`} aria-label={isFavoriteItem ? 'Remove recipe from favorites' : 'Add recipe to favorites'}>
                    <Heart/>
                    <HeartFilled/>
            </button>
        </li>
    )
}