// React
import { useContext } from "react";

// Components
import { NavItem } from "./NavItem";

// Context
import { NavContext } from "../Context";

export function Nav(){
    const {typesData} = useContext(NavContext);

    return (
        <nav className="nav">
            {typesData.map((type, index) => (<NavItem key={index} type={type}/>))}
        </nav>
    )
}