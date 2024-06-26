import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from "./Layout.jsx"
import Home from "./Components/Home/Home.jsx"
import './index.css'
import { createBrowserRouter,Route,RouterProvider,createRoutesFromElements } from 'react-router-dom'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route path="" element={<Home/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)