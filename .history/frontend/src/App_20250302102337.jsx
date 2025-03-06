import Login from "./pages/Login.jsx"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* Add more routes as needed */}
    </Routes>
  
    </>
  )
}

export default App
