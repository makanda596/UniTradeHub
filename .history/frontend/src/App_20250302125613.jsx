import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/signup.jsx"

function App() {
  const showAlert = () => {
    alert("Hello! This is an alert.");
  };
  return (
    <>
        <h1>Passing Function as a Prop</h1>
        <Message showAlert={showAlert} /> {/* Passing function as a prop */}
     
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
