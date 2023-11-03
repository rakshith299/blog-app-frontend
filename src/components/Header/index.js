import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./style.css";

const Header = () => {
    
    let token = localStorage.getItem("jwtToken");

    function handleLogOut(){
        localStorage.removeItem("jwtToken");

        window.location.href = "/login";
    }


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href = "/home-page-blogs">Bloggers Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home-page-blogs">Home</Nav.Link>
            <Nav.Link href="/create-blog">Create Blog</Nav.Link>
            <Nav.Link href="/my-blogs">My Blogs</Nav.Link>
            <Nav.Link href="/users">All Users</Nav.Link>
            {
                token ? 
                <div>
                    <Nav.Link href="#" onClick={handleLogOut}>LogOut</Nav.Link>
                </div> : 

                <>
                    <Nav.Link href="/login">LogIn</Nav.Link>
                    <Nav.Link href="/">Register</Nav.Link>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;