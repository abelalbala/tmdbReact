import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import apikey from "../tmdbKeys";
import Menu from "../components/Menu";
import RightClickMenu from '../components/RightClickMenu';
import { TokenContext } from "../Context";

export default function MovieDetail() {
  const [peli, setPeli] = useState(null);
  const { id } = useParams();
  const [menuInfo, setMenuInfo] = useState({ show: false, posX: 0, posY: 0, movie: "" });
  const { loggedIn } = useContext(TokenContext);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPeli(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);


  
  const handleClick = (e) => {
    e.preventDefault();

    if (e.nativeEvent.button === 2) {
      setMenuInfo({ show: true, posX: e.pageX, posY: e.pageY, movie: e.target.getAttribute('data-key') });
    }
  };

  const handleListItemClick = (movie) => {
    // Afegir la pel·lícula a la llista "Favoritos" cridant a l'API
    const header = new Headers();
    header.append("Content-Type", "application/json;charset=utf-8");
    let body = JSON.stringify({ media_type: "movie", media_id: peli.id, favorite: true });
    let opt = {
      method: "POST",
      body: body,
      headers: header,
    };

    let url =
      "https://api.themoviedb.org/3/account/abelalbala/favorite?api_key=9802fcc329ca6f0be208e8f587c109d0&" +
      `session_id=${loggedIn}`;

    fetch(url, opt)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    padding: "1rem",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "2rem auto",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "1rem",
  };

  const textStyle = {
    fontSize: "1rem",
    color: "#555",
    marginBottom: ".5rem",
  };

  return (
    <div>
      <Menu />
      <br />
      {peli ? (
         <div style={containerStyle} onContextMenu={handleClick} data-key={peli.id}>
          <p style={titleStyle}>{peli.original_title}</p>
          <img
            style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            src={`https://image.tmdb.org/t/p/original${peli.poster_path}`}
          />
          <p style={textStyle}>Lenguaje original: {peli.original_language}</p>
          <p style={textStyle}>Titulo original: {peli.original_title}</p>
          <p style={textStyle}>Popularidad (de 0 a 1): {peli.popularity}</p>
          <p style={textStyle}>Fecha de salida: {peli.release_date}</p>
        </div>
      ) : (
        <p style={textStyle}>Cargando...</p>
      )}
      <RightClickMenu data={menuInfo} onListItemClick={handleListItemClick} />
    </div>
  );
}
