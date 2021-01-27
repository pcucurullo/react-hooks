// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorage(
  key,
  initialValue = '',
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse
  } = {}) {
  const [state, setState] = React.useState(() => {
      const localValue = window.localStorage.getItem(key);
      return localValue
        ? deserialize(localValue)
        : typeof initialValue === 'function'
        ? initialValue()
        : initialValue;
    }
  )

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [state, key, serialize]);

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
 A custom hook name should start with "use" and it will use other React hooks inside.
 When creating a custom hook it's really important to think about which params the user might want to change.
 */