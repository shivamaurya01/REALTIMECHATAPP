import { StrictMode } from 'react'
import "@fontsource/outfit";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import {Provider} from 'react-redux'
import { store } from './redux/store.js'
export const serverUrl = "https://realtimechatapp-backend-75du.onrender.com"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  
)
  
