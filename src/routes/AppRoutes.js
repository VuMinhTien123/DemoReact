import {Routes, Route, Link} from "react-router-dom"

import React from 'react'
import Home from '../components/Home';
import Login from '../components/Login';
import TableUser from '../components/TableUser';
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "./NotFound";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='login' element= {<Login />} />

          <Route
          path = "/users"
          element = {
            <PrivateRoutes>
            <TableUser />
          </PrivateRoutes>
          }
           />
           <Route path="*" element= {<NotFound />} />
        </Routes> 

        
    </div>
  )
}

export default AppRoutes
