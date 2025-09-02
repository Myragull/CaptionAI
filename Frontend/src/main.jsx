import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { AuthProvider } from "./context/AuthContext"; // ✅ import AuthProvider

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
     <AuthProvider> {/* ✅ wrap the app */}
       <App />
     <ToastContainer/>
      </AuthProvider>
   </BrowserRouter>
    
)
