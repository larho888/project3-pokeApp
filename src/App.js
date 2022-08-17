import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    console.log(userChoice)
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
      <div className="pokemonImg">
        <h1>{pokemon.name}</h1>
        <img src={pokemon.img} alt="" />
        <form>
          <input type="text" onChange={(e) => {
            setUserChoice(e.target.value.toLowerCase());
          }} value={userChoice} />
          <button onClick={handleClick} >Guess!</button>
        </form>
        <div>
          <p>Total Score: {counter}</p>
        </div>
      </div>

    </div>
  );
}

export default App;
