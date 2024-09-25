import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Link, Outlet } from "react-router-dom"
import ProductsHome from './ProductsHome';

function Home() {
    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand className='d-flex align-items-center'>
                        <img
                            alt=""
                            src="https://i.pinimg.com/564x/23/60/9c/23609c05d34c3e181e3c3bee3e177a53.jpg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        <div className='ms-2'>
                            Rogelios Coffee
                        </div>

                    </Navbar.Brand>
                    <Container>
                        <Nav className="me-auto">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/about-us" className="nav-link">About Us</Link>
                            <Link to="/view-all" className="nav-link">View All</Link>
                            <Link to="/create" className="nav-link">Create</Link>
                        </Nav>
                    </Container>
                </Container>
            </Navbar>
            <Outlet/>
        </>
    );
}

export default Home;