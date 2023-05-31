// React
import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
// API
import { getSearchMeals, filterByArea, filterByCategory } from "../api";
// Components
import { MealListItem } from "./MealListItem";
import { MealItemSkeleton } from "./MealItemSkeleton";
// Context
import { AppContext } from "../Context";
import { NotFound } from "../Pages/NotFound";

export function MealList(){
    const {showcaseLoading, setShowcaseLoading, searchParams, setSearchParams} = useContext(AppContext);
    const [mealItems, setMealItems] = useState([]);
    const [error, setError] = useState(false);

    const location = useLocation();


    useEffect(() => {     
        if(location.state){
            const keys = Object.keys(location.state);
            switch(keys[0]){
                case 'search':
                    setSearchParams({search: location.state.search}); 
                    break;
                case 'category':
                    setSearchParams({category: location.state.category}); 
                    break;
                case 'area':
                    setSearchParams({area: location.state.area}); 
                    break;
            }
                 
            return;
        }
        const value = searchParams.get('search') || searchParams.get('area') || searchParams.get('category');
        
        if(searchParams.get('search')){
            updateMealItems(value, 'search');
        } else if(searchParams.get('area')){
            updateMealItems(value, 'area');
        } else if(searchParams.get('category')){
            updateMealItems(value, 'category');
        } else{
            updateMealItems(value, 'search');
        }
    }, [searchParams])

    const updateMealItems = (item, type) => {
        setShowcaseLoading(true);
        setError(false);

        if(type === 'category'){
            filterByCategory(item).then(data => {      
                if(data.meals){
                    setMealItems(data.meals);
                } else{
                    setError(true);
                }
                setShowcaseLoading(false);
            })
        } else if(type === 'area'){
            filterByArea(item).then(data => {
                if(data.meals){
                    setMealItems(data.meals);
                } else{
                    setError(true);
                }
                setShowcaseLoading(false);
            })
        } else{
            getSearchMeals(item).then(data => {
                if(data.meals){
                    setMealItems(data.meals);
                } else{
                    setError(true);
                }
                setShowcaseLoading(false);
            })
        }
    }

    return (
        <>
            {error ? <NotFound/> : (
                <ul className="meal-list">    
                    {!showcaseLoading ? mealItems.map(meal => <MealListItem key={meal.idMeal} {...meal}/>) : [...Array(10)].map((item, index) => (<MealItemSkeleton key={index}/>))}
                </ul>
            )}
        </>
    )
}