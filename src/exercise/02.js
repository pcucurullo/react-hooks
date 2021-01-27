// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorage(key, initialValue) {
  const [state, setState] = React.useState(() =>
    window.localStorage.getItem(`${key}`) || initialValue
  )

  React.useEffect(() => {
    window.localStorage.setItem(`${key}`, state.toString());
  }, [state, key]);

  return [state, setState];
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [name, setName] = useLocalStorage('name', initialName);

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name);
  // }, [name]);

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name}/>
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App


/**
 useState checks the initial value which can sometimes be costly, but it can receive a function instead of a value to only on the first render and optimize. This is called lazy state initialization.
 Components re-render if their siblings re-render.

 */