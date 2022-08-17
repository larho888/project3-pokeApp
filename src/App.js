import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from './Image';
import Form from './Form';
import title from './title.png';

function App() {

  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
  });

  const [num, setNum] = useState(123);

  const [userChoice, setUserChoice] = useState('');

  const [counter, setCounter] = useState(0);

  const randomNumber = (num) => {
    return Math.floor(Math.random() * num);
  }

  useEffect (() => {
    setNum(randomNumber(252));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setNum(randomNumber(252));
    setUserChoice('');
    if (pokemon.name === userChoice) {
      setCounter(prevCount => prevCount + 1);
    }
  };

  const url = `https://pokeapi.co/api/v2/pokemon/${num}`;

  useEffect(() => {
    axios({
      url: `${url}`,
      method: "GET",
      dataResponse: "json",
      params: {
        format: "json",
      },
    }).then((response) => {
      setPokemon({ 
        name: response.data.name, 
        img: response.data.sprites.front_default })
  });
  }, [num]);

  return (
    <div className="App">
      <div className='wrapper'>
        <img src={title}></img>
        <Image pokemon={pokemon} />
        <Form setUserChoice={setUserChoice} userChoice={userChoice} handleClick={handleClick} counter={counter} />
      </div>
    </div>
  );
}

export default App;
