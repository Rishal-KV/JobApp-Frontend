import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import Auth from "./Routes/Auth"
import AdminRoute from "./Routes/AdminRoute"
import UserRoute from "./Routes/UserRoute"
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/*" element={<Auth/>}/>
        <Route path="/admin/*" element={<AdminRoute/>}/>
        <Route path="/user/*" element={<UserRoute/>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
