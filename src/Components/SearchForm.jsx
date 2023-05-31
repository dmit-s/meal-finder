// React
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Assets
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Close } from "../assets/close.svg";

//Context
import { AppContext } from "../Context";


export function SearchForm(){
    const navigate = useNavigate();
    const location = useLocation();

    const [searchValue, setSearchValue] = useState(location.search.slice(8));
    const {enabledMobileNav, toggleMobileNav, setSearchParams} = useContext(AppContext);
    
    const onSubmit = (e) => {
        e.preventDefault();
        const regex = /\s{2,}/gm;
        let searchTerm = searchValue.trim();       
        if(searchTerm.length === 0) return;
        
        searchTerm = searchTerm.replace(regex, ' ');

        if(location.pathname === '/'){
            setSearchParams({search: searchTerm});
        } else{
            navigate("/", {replace: true, state: {search: searchTerm}});
        }
        
        if(enabledMobileNav){
            toggleMobileNav();
        }
    }

    const handleClearSearch = () => {
        setSearchValue('')
    }


    return (
        <form onSubmit={onSubmit} className="search-form">
            <button className="search-form__search-btn" aria-label="Find a recipe">
                <Search className="search-form__search-btn-icon"/>
            </button>
            <fieldset className="search-form__group">
                <input onChange={(e) => setSearchValue(e.target.value)} className="search-form__input" value={searchValue} type="text" placeholder="Search recipe"/>
                <button onClick={handleClearSearch} className={`search-form__close-btn ${searchValue.length > 0 && 'show'}`} type="reset" aria-label="Clear text">
                    <Close className="search-form__close-btn-icon"/>
                </button>
            </fieldset>
        </form>
    )
}