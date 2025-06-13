import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState(0)

  const getData=async ()=>{
    let resp=await fetch("https://jsonplaceholder.typicode.com/todos");
    let res=await resp.json();
    console.log(res);
    setData(res);
  }

  return (
    <>
     <button onClick={getData}>get data</button>
    </>
  )
}

export default App
