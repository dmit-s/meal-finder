// React
import { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
// Assets
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as HeartFilled } from "../assets/heart-filled.svg";
// Api
import { getMealById } from "../api";
// Components
import { ThreeDots } from "../Components/ThreeDots";
// Page
import { NotFound } from "./NotFound";
// Context
import { AppContext, FavoriteContext } from "../Context";

export function MealSingle(){
    const location = useLocation();
    const [mealData, setMealData] = useState([]);
    const [isFavoriteItem, setFavoriteItem] = useState(false);
    const {id} = useParams();
    const {strMeal, strCategory, strArea, strTags, strMealThumb, strInstructions, strYoutube} = mealData;
    const [error, setError] = useState(false);
    const {favoriteData, toggleFavorite, updFavoriteData} = useContext(FavoriteContext);
    const {setModalActive} = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setModalActive(false);
        getMealById(id).then(data => {
            if(data.meals){
                setMealData(data.meals[0]);
                setLoading(false);             
            } else{
                setError(true);
            }
        })
    }, [location.pathname])

    useEffect(() => {
        updFavoriteData(id, setFavoriteItem);
    }, [favoriteData])

    return (
        <>
            {error ? <NotFound/> : !loading ? (
                <section className="single-meal">
                    <div className="single-meal__header">
                        <div className="single-meal__header-left">
                            <h4 className="single-meal__header-left-title">{strMeal}</h4>
                            <button onClick={() => toggleFavorite(id, isFavoriteItem)} className={`single-meal__header-left-btn btn btn--add-to-favorite ${isFavoriteItem ? 'active' : ''}`} aria-label={isFavoriteItem ? 'Remove recipe from favorites.' : 'Add recipe to favorites.'}>
                                <Heart/>
                                <HeartFilled/>
                            </button>
                        </div>

                        <div className="single-meal__header-details">
                            <p className="single-meal__header-details-item">Category: <span>{strCategory}</span></p>
                            <p className="single-meal__header-details-item">Area: <span>{strArea}</span></p>
                        </div>
                    </div>
                    {strTags && 
                        <ul className="single-meal__tags" aria-label="Tag list">
                            {strTags && strTags.split(',').map((item, index) => (
                                <li key={index} className="single-meal__tags-item">
                                    <p className="single-meal__tags-item-text">{item}</p>
                                </li>
                            ))}
                        </ul> 
                    }

                    <div className="single-meal__flex">
                        <div className="single-meal__img">
                            <img src={strMealThumb} alt={strMeal} />
                        </div>
                        <table className="single-meal__table">
                            <thead>
                                <tr>
                                    <th className="single-meal__table-title">Ingredient</th>
                                    <th className="single-meal__table-title">Measure</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(mealData).map((item, index) => {
                                    if(item.startsWith('strIngredient') && mealData[item]){
                                        return (
                                            <tr key={index}>
                                                <td className="single-meal__table-cell">{mealData[item]}</td>
                                                <td className="single-meal__table-cell">{mealData[`strMeasure${item.slice(13)}`]}</td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="single-meal__instruction">
                        <h6 className="single-meal__instruction-title">Instruction:</h6>
                        <p className="single-meal__instruction-text">{strInstructions}</p>
                    </div>
                    <iframe src={`${strYoutube && strYoutube.replace('watch?v=', 'embed/')}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                </section>
            ) : <ThreeDots/> }
        </>
    )
}