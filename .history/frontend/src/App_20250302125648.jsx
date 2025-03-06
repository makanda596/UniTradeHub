import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/signup.jsx"

function App() {
 
  return (
    <>
        {/* Passing function as a prop */}
     
      <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
