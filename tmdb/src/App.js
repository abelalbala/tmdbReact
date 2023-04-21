import './App.css';
import Menu from './components/Menu';
import { Link } from 'react-router-dom';
import { TokenContext } from './Context';
import {React, useContext} from 'react';

function App() {

  //const[loggedIn, setLoggedIn] = useContext(TokenContext);
  const { loggedIn, setLoggedIn, apiKey, setApiKey } = useContext(TokenContext);

  return (
    <div className="App">
      <Menu />
    </div>
  );
}

export default App;
