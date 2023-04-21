import { React, useEffect, useContext } from "react";
import apikey from "../tmdbKeys";
import { TokenContext } from "../Context";
import Menu from "../components/Menu";

export default function Logout() {
    const { loggedIn, setLoggedIn, accountId, setaccountId } = useContext(TokenContext);

    const logout = async () => {

        const bodyObj = JSON.stringify({
            "session_id": loggedIn
        });
  
        const opt = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: bodyObj
        };
        
        const url = `https://api.themoviedb.org/3/authentication/session?api_key=${apikey}`;

        let response = await fetch(url, opt);
        let data = await response.json();
        if(data.success) {
            setLoggedIn("")
            console.log("Se ha cerrado session correctamente")
        }
        else console.log("No ha cerrado session correctamente")
    };

    useEffect(() => {
        logout();
    }, []);

    useEffect(() => {
        if (loggedIn === "") {
        console.log("LoggedIn Login: " + loggedIn);
        }
    }, [loggedIn]);

    return (
        <>
        <Menu />
        </>
    );
}
