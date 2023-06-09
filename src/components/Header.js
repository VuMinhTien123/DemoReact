import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import logoApp from '../assets/img/logo192.png'
import { useLocation } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { UserContext } from '../context/useContext'

const Header = (props) => {

  const { logout, user } = useContext(UserContext);

  const [hideHeader, setHideHeader] = useState(false)

  // useEffect(() => {
  //   if(window.location.pathname === '/login') {
  //     setHideHeader(true);
  //   }
  // }, [])

  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Log out success")
  }



  const location = props;
  return (
    <div>
    <Navbar bg="light" expand="lg" >
      <Container>
        <Navbar.Brand href="/">
          
          <img
          src={logoApp}
          width= "30"
          height="30"
          className='d-inline-block aligin-top'
          alt='React bootstrap logo'
           />
           <span>App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth || window.location.pathname === '/') &&
          <>
          <Nav className="me-auto">            
            <NavLink to="/" className="nav-link">Home</NavLink>                           
            <NavLink to="/users" className="nav-link">Manage users</NavLink>
            </Nav>

            <Nav>
           { user && user.email && <span className='nav-link'> Welcome {user.email} </span>}   
            <NavDropdown title="Setting" >
              {user && user.auth === true
              ? <NavDropdown.Item onClick={() => handleLogout()}>Logout </NavDropdown.Item>  
              : <NavLink to="/login" className="dropdown-item">Login</NavLink> 
              }     
            </NavDropdown>
            </Nav>
          </>

}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
