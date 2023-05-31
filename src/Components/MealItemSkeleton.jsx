import { forwardRef } from "react"

export const MealItemSkeleton = forwardRef((props, ref) => {
    return (
        <li ref={ref} className="meal-list__item">
            <a className="meal-list__item-link" href="#!">
                <div className="meal-list__item-img skeleton"></div>
                <div className="meal-list__item-content">
                    <div className="meal-list__item-content-title skeleton"></div>
                </div>
            </a>
        </li>
    )
})