import {Route,Routes} from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"

function Mainroutes() {
  return (
<Routes> 
    <Route path="/Home" element={<Home/>} />
    <Route path="/" element={<Register/>}/>
    <Route path="/Login" element={<Login/>}/>

</Routes>
)
}

export default Mainroutes