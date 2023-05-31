// React
import { Link } from "react-router-dom";

export function NotFound(){

    return (
        <div className="error-page">
            <div className="error-page__content">
                <h2 className="error-page__content-name">404</h2>
                <p className="error-page__content-message">Nothing found.</p>
                <Link to={"/"} className="error-page__content-btn btn--home">Go to home page</Link>
            </div>       
        </div>
    )
}