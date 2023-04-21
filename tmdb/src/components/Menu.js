import {React, useContext} from 'react';
import { Link } from 'react-router-dom';
import '../style/menu.css';
import { TokenContext } from '../Context';

function Menu() {
  const { loggedIn, setLoggedIn, accountId, setaccountId } = useContext(TokenContext);
  
  return (
    <div className="navigationContainer" style={{ backgroundColor: '#333', display: 'flex', justifyContent: 'center' }}>
      <nav>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center' }}>
          <li style={{ marginRight: '20px' }}>
            <Link to="/">
              <img className="logo" src={require(`../img/logo.png`)} style={{ height: "100px", width: "100px" }} />
            </Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/search" style={{ textDecoration: 'none', color: 'white' }}>Search</Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/lists" style={{ textDecoration: 'none', color: 'white' }}>Lists</Link>
          </li>

          {Boolean(loggedIn) ? (
            <button style={{ marginRight: '20px' }}>
              <Link to="/logout" style={{ textDecoration: 'none', color: 'white' }}>Tancar sessió</Link>
            </button>
          ) : (
            <button style={{ marginRight: '20px' }}>
              <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
            </button>
          )}

        </ul>
      </nav>
    </div>

  );
}

export default Menu;
