import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from './Image';
import Form from './Form';
import { db } from './Firebase-config';
import { collection, getDocs, addDoc, query, orderBy, limit } from "firebase/firestore";

function App() {

  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
  });

  const [newName, setNewName] = useState('');
  const [num, setNum] = useState(123);
  const [userChoice, setUserChoice] = useState('');
  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const highScore = query(usersCollectionRef, orderBy("score", "desc"), limit(3));

  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, score: counter});
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(highScore);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getUsers()
  }, [createUser]);


  // to randomly select a pokemon id
  const randomNumber = (num) => {
    return Math.floor(Math.random() * num);
  }

  useEffect (() => {
    setNum(randomNumber(252));
  }, []);

  // onclick run the randomizer again, clear input and +1 to counter if input is correct
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
    <>
    <main>
      <div className='wrapper'>
        <Image pokemon={pokemon} />
        <Form setUserChoice={setUserChoice} userChoice={userChoice} handleClick={handleClick} counter={counter} />
        <div className="name">
          <input type="text" placeholder='Enter Name' onChange={(e) => {setNewName(e.target.value)} } />
          <button onClick={createUser}>Submit</button>
        </div>
        <div className='highScore'>
          <h2>Leaderboard</h2>
          {users.map((user) => {
          return(
            <div className='leaderBoard'>
              <h3>Name: {user.name} Score: {user.score}</h3>
            </div>
            )
          })}
        </div>
      </div>
    </main>
    <footer>
        <p>Created at Juno College</p>
    </footer>
    </>
  );
}

export default App;

