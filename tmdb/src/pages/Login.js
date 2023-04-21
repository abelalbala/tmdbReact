import { React, useState, useEffect, useContext } from "react";
import apikey from "../tmdbKeys";
import { TokenContext } from "../Context";
import Menu from "../components/Menu";

export default function Login() {
  const { loggedIn, setLoggedIn, accountId, setaccountId } = useContext(TokenContext);

  let token = "";

  const getAccessToken = async () => {
    const opt = { method: "GET" };

    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${apikey}`;

    let response = await fetch(url, opt);
    let data = await response.json();

    console.log("GET Access Token");
    console.log(data);

    return data.request_token;
  };

  const getUserValidation = async (token) => {
    const bodyObj = JSON.stringify({
      username: "abelalbala",
      password: "abelalbala",
      request_token: token,
    });

    const opt = {
      method: "POST",
      body: bodyObj,
      headers: { "Content-Type": "application/json" },
    };

    const url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apikey}`;

    let response = await fetch(url, opt);
    let data = await response.json();

    console.log("Validate Mail");
    console.log(data);

    return data.success;
  };

  const getSessionId = async (token) => {
    const bodyObj = JSON.stringify({
      "request_token": token
    });

    const opt = {
      method: "POST",
      body: bodyObj,
      headers: { "Content-Type": "application/json" },
    };
    
    const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${apikey}`;

    let response = await fetch(url, opt);
    let data = await response.json();

    console.log("SESSION ID");
    console.log(data);

    return data.session_id;
  };

  const login = async () => {
    if (!loggedIn) {
      token = await getAccessToken();
  
      let validation = await getUserValidation(token);
  
      if (validation) {
        const sessionId = await getSessionId(token);
        if(sessionId === undefined) console.log("error session_id undefined")
        else {
          setLoggedIn(sessionId);
          console.log("Ok session_id "+sessionId)
        }
      } else {
        console.log("error");
      }
    }
  };
  
  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    if (loggedIn !== "") {
      console.log("LoggedIn Login: " + loggedIn);
    }
  }, [loggedIn]);

  return (
    <>
      <Menu />
    </>
  );
}
