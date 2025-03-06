import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"

function App() {

  return (
    <>
    <>hello</>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      {/* Add more routes as needed */}
    </Routes>
  
    </>
  )
}

export default App
