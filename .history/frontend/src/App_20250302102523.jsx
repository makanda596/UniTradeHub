import Home from "./pages/Home.js"
import Login from "./pages/Login.jsx"

function App() {

  return (
    <>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      {/* Add more routes as needed */}
    </Routes>
  
    </>
  )
}

export default App
