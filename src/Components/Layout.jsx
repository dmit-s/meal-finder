// React
import { Outlet } from "react-router-dom";

// Components
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Favorite } from "./Favorite";

// Context
import { AppContextProvider, NavContextProvider, FavoriteContextProvider } from "../Context";

export function Layout(){
    
    return (
        <>
            <AppContextProvider>
                <NavContextProvider>
                    <FavoriteContextProvider>
                        <Header/>
                            <main>
                                <Outlet/>
                            </main>
                        <Footer/>
                        <Favorite/>
                    </FavoriteContextProvider>
                </NavContextProvider>
            </AppContextProvider>
        </>
    )
}