import { useState, useEffect, createContext } from "react";

export const TokenContext = createContext()

const Context = ({children}) =>{
    const[loggedIn, setLoggedIn] = useState('');
    const [accountId, setaccountId] = useState('');
    const [pelisFav, setPelisFav] = useState([]);
    const rightClickPrevent = (event) => {
        event.preventDefault();
    }
    return(
        <main onContextMenu={rightClickPrevent}>
            <TokenContext.Provider value={{loggedIn, setLoggedIn, accountId, setaccountId, pelisFav, setPelisFav}}>{children}</TokenContext.Provider>
        </main>
    )
}

export { Context };
