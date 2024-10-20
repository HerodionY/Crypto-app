import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CryptoList from './Medium/CrytoList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <CryptoList/>
      </div>
     
    </>
  )
}

export default App
