import React from 'react'
import {Routes, Route} from "react-router-dom"
import { UserContext } from '../context/useContext';
import { useEffect, useContext } from 'react';
import { Alert } from 'react-bootstrap';

const PrivateRoutes = (props) => {

    const { user } = useContext(UserContext);

    if(user && !user.auth) {
        return <>
        

        <Alert variant="danger" className='mt-3'>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
        You don't have premisson to acess this route
        </p>
      </Alert>
        </>
    }

  return (
    <div>
      {props.children}
    </div>
  )
}

export default PrivateRoutes
