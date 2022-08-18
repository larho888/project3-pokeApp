import score from './score.png';

const Form = (props) => {
return(
    <><form>
        <input type="text" onChange={(e) => {
            props.setUserChoice(e.target.value.toLowerCase());
        } } value={props.userChoice} />
        <button onClick={props.handleClick}>Guess!</button>
    </form>
    <div className='score'>
        <div className='scoreImg'>
            <img src={score}></img>
        </div>
        <p>{props.counter}</p>
    </div></>
)}

export default Form;