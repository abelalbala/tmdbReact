import Menu from '../components/Menu';
import { React, useEffect, useContext, useState } from "react";
import { TokenContext } from "../Context";

export default function Lists() {
    
    const { loggedIn, pelisFav, setPelisFav } = useContext(TokenContext);
    const favoritos = async () => {
        let url = `https://api.themoviedb.org/3/account/abelalbala/favorite/movies?api_key=9802fcc329ca6f0be208e8f587c109d0&session_id=${loggedIn}&language=en-US&sort_by=created_at.asc&page=1`;
        let response = await fetch(url);
        let data = await response.json();
        setPelisFav(data.results);
    };

    useEffect(() => {
        favoritos();
    }, []);

      return (
        <div>
          <Menu />
          <h1>Favoritos</h1>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {pelisFav.map((movie) => (
                <div key={movie.id} style={{ margin: "20px", backgroundColor: "#f0f0f0", borderRadius: "5px", padding: "10px", width: "200px" }}>
                    <h3>{movie.original_title}</h3>
                    <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.original_title}
                    style={{ width: "100%", borderRadius: "5px" }}
                    />
                </div>
            ))}
        </div>
        </div>
      );
}
