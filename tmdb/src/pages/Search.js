import { useState, useContext, useEffect } from 'react';
import Menu from '../components/Menu';
import {Movie} from '../components/Movie';
import { TokenContext } from "../Context";

export default function Search() {
  const [textSearch, setTextSearch] = useState('');
  const [albums, setAlbums] = useState([]);
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
  const isFavMovie = (movieId) => {
    return pelisFav.some((favMovie) => favMovie.id === movieId);
  };  


  const searchPelis = async (e) => {
    e.preventDefault();

    const headerObj = new Headers();
    headerObj.append('Content-Type', 'application/json');
                
    const opt = {method: "GET", headers: headerObj};
    const url = `https://api.themoviedb.org/3/search/movie?api_key=9802fcc329ca6f0be208e8f587c109d0&language=en-US&query=${textSearch}&page=1&include_adult=false`;
        
    let response = await fetch(url, opt);
    let data = await response.json();
    console.log(data.results);
    setAlbums(data.results);      
  };
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <Menu />
      <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '1rem' }}>Search</h1>
      <form onSubmit={searchPelis} style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <input
          type="text"
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          style={{ marginRight: '1rem', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
        />
        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '1rem', border: 'none', cursor: 'pointer' }}>
          Search
        </button>
      </form>
      <br />
      {albums.map((album) => (
        
          <Movie
            key={album.id}
            id={album.id}
            title={album.original_title}
            posterPath={album.poster_path}
            isFav={isFavMovie(album.id)}
            style={{ display: 'inline-block', margin: '1rem', textAlign: 'left' }}
          />
       
      ))}
    </div>

  );
}
