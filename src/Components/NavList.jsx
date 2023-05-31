// React
import { useState, useEffect } from "react";

// Api
import { getAreas, getCategories } from "../api";

// Components
import { NavListItem } from "./NavListItem";

export function NavList({type}){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        switch(type){
            case 'Categories':
                getCategories().then(data => {
                    setItems(data.meals);
                    setLoading(false);
                });
                break;
            case 'Areas':
                getAreas().then(data => {
                    setItems(data.meals);
                    setLoading(false);
                });
                
                break;             
        }
    }, [])

    return (
        <ul className="nav__list"> 
            {loading ? 'Loading...': items.map((item, index) => <NavListItem key={index} str={type === 'Categories' ? item.strCategory : item.strArea} type={type}/>)}
        </ul>
    )
}