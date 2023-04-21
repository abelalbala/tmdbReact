import { React, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RightClickMenu from '../components/RightClickMenu';
import { TokenContext } from "../Context";

export function Movie({ id, title, posterPath, isFav }) {
  const [menuInfo, setMenuInfo] = useState({ show: false, posX: 0, posY: 0, movie: "" });
  const { loggedIn } = useContext(TokenContext);
  const movieStyle = {
    width: "100px",
    height: "100px"
  };

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
    let body = JSON.stringify({ media_type: "movie", media_id: id, favorite: true });
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

  return (
    <div onContextMenu={handleClick} style={{ display: 'inline-block', textAlign: 'center', margin: '1rem', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '4px', overflow: 'hidden', width: '300px' }}>
      <img
        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
      />
      <Link to={`/movie-detail/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}><h3 style={{ fontSize: '1.5rem', color: '#333', margin: '0.5rem 0' }}>{title}</h3></Link>
      <div className="buttons" style={{ padding: '0.5rem' }}>
        <button
          id="fav"
          onClick={`setFav(${id}, ${!isFav})`}
          style={{
            backgroundColor: isFav ? 'red' : '#4CAF50',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '0.5rem',
          }}
        >
          {isFav ? 'No Me Gusta' : 'Me Gusta'}
        </button>
        <br />
      </div>
      <RightClickMenu data={menuInfo} onListItemClick={handleListItemClick} />
    </div>
  );
}
