const Image = (props) => {

    return (
    <div className="pokemonImg">
          <img src={props.pokemon.img} width="250" height="250" alt={`Picture of ${props.pokemon.name}`} />
        </div>
    )
}

export default Image;