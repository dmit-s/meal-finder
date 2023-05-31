// React
import { useContext, useEffect } from "react";
// Context
import { FavoriteContext } from "../Context";
// Components
import { FavoriteListItem } from "./FavoriteListItem";

export function FavoriteList(){
    const {favoriteData, removeItems} = useContext(FavoriteContext);

    useEffect(() => {
        localStorage.setItem('RemoveItems', JSON.stringify(removeItems));
    }, [removeItems])

    return (
        <ul className="favorite__list">
            {favoriteData.map(favoriteId => <FavoriteListItem key={favoriteId} id={favoriteId}/>)}
        </ul>
    )
}