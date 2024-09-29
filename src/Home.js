import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Link, Outlet } from "react-router-dom"



function Home() {
    return (
        <>
            <Navbar className="navstyle">
                <Container>
                    <Navbar.Brand className='navfont d-flex align-items-center'>
                        <img
                            alt=""
                            src="https://i.pinimg.com/564x/23/60/9c/23609c05d34c3e181e3c3bee3e177a53.jpg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        <div className='ms-2'>
                            Rogelio's Coffee
                        </div>

                    </Navbar.Brand>

                    <div className='d-flex ms-auto align-items-center'>
                        <Nav className="me-3">
                            <Link to="/" className="navfont nav-link">Home</Link>
                            <Link to="/about-us" className="navfont nav-link">About Us</Link>
                            <Link to="/view-all" className="navfont nav-link">View All</Link>
                            <Link to="/create" className="navfont nav-link">Create</Link>
                        </Nav>
                    </div>
                </Container>
            </Navbar>
            <Outlet />
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-text">
                        Rogelio's Coffee
                    </div>
                    <div className="footer-links">
                        <span>Web Developer: Rogelio Acosta. Follow on </span>
                        <a href="https://github.com/RogelioAD" className="footer-link">GitHub</a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Home;