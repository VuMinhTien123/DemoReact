import React from 'react'
import { Alert } from 'react-bootstrap'
const Home = () => {
  return (
    <div>
      <Alert variant="success">
      <Alert.Heading>Hey, nice to see you</Alert.Heading>
      <p className='Alert-home'>
      Please login to your email account : eve.holt@reqres.in
      </p>
      <hr />
      <p className="mb-0 Alert-home"  >
        Thank you so much !!!
      </p>
    </Alert>
    </div>
  )
}

export default Home
