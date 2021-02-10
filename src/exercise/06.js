// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null
  });
  const {status, pokemon, error} = state;

  React.useEffect(() => {
    if (!pokemonName || pokemonName === '') return;
    setState({status: 'pending', pokemon: null, error: null});

    fetchPokemon(pokemonName).then(
        pokemon => {
          setState({status: 'resolved', pokemon, error: null});
        },
        error => {
          setState({status: 'rejected', pokemon: null, error});
        }
      )
  }, [pokemonName]);

  if (status === 'rejected') {
    return <div role="alert">There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre></div>
  } else if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
