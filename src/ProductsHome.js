import { Card, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Alert } from "react-bootstrap";
import axios from "axios"
import './style.css'

function ProductsHome() {

    let [products, setProducts] = useState([])
    let [error, setError] = useState()

    useEffect(() => {
        setError(null);
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3001/products?_limit=3');
                console.log(response.data)
                setProducts(response.data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchProducts();
    }, []);


    function errorMessage() {
        return <Alert variant="danger">There was an error attempting to load this product: {error}</Alert>
    }


    function productCard(products) {
        let { id, itemName, price, image } = products
        console.log("item id:" + id)
        return (
            <Card key={id} className="bordercard card-design font d-inline-block align-top">
                <Card.Body className="padding d-flex flex-column justify-content-center align-items-center">
                    <Card.Img className="img" src={image} />
                    <Card.Title>{itemName}</Card.Title>
                    <Card.Text>
                        <div>
                            <strong>Price: ${price}</strong>
                        </div>
                    </Card.Text>
                    <div style={{ transform: 'scale(0.8)' }} className="d-flex align-items-center">
                        <Link to={`/${id}/full`} className="view btn btn-secondary ms-1">View</Link>
                        <Link to={`/${id}/edit-home`} className="edit btn btn-primary ms-1">Edit</Link>
                    </div>
                </Card.Body>
            </Card>
        );
    }
    return (
        <Container>
            {error && errorMessage()}
            <Row className="justify-content-center">
                {products.map(product => productCard(product))}
            </Row>

        </Container>
    );
}

export default ProductsHome