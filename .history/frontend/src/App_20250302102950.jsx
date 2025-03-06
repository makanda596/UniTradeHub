import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"

function App() {

  return (
    <>
    <p>hello</p>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
    </Routes>
  
    </>
  )
}

export default App
