// React
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import { MealItemSkeleton } from "./MealItemSkeleton";

export function MealListItem({idMeal, strMeal, strMealThumb}){
    const newRef = useRef(null);
    const [inView, setInView] = useState(false);

    const observerFunc = (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                setInView(true);
            }
        })
    }
    
    useEffect(() => {
        const observer = new IntersectionObserver(observerFunc, {threshold: 0.4});
        if(newRef.current) observer.observe(newRef.current);

        return () => {
            if(newRef.current) observer.unobserve(newRef.current);
        }
    }, [])

    return (
        <>
            {inView ? (
                <li ref={newRef} className="meal-list__item">
                    <Link to={idMeal} className="meal-list__item-link">
                        <div className="meal-list__item-img">
                            <img src={strMealThumb} alt={strMeal} />
                        </div>
                        <div className="meal-list__item-content">
                            <p className="meal-list__item-content-title">{strMeal}</p>
                        </div>
                    </Link>
                </li>
            ) : (
                <MealItemSkeleton ref={newRef}/>
            )}
        </>
        
    )
}