import { Card, Container, Row } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Alert } from "react-bootstrap";
import axios from "axios"

function Product() {
    let params = useParams()
    let navigate = useNavigate()

    let [products, setProducts] = useState([])
    let [error, setError] = useState()

    async function refreshProducts() {
        const response = await axios.get("http://localhost:3001/products")
        setProducts(response.data)
    }

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

    function deleteProduct(id) {
        axios.delete(`http://localhost:3001/products/${id}`)
            .then(refreshProducts)
    }

    function errorMessage() {
        return <Alert variant="danger">There was an error attempting to load this product: {error}</Alert>
    }

    function handleDeleteProduct(id) {
        deleteProduct(id)
        //may have to navigate to certain param after deleting or view function
    }

    function productCard(products) {
        let { id, itemName, description, temp, price, image } = products
        console.log("item id:" + id)
        return (
            <Card key={id} className="d-inline-block align-top" style={{ width: '30%', margin: '2px' }}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Img style={{ width: '80%' }} src={image} />
                    <Card.Title>{itemName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
                    <Card.Text>
                        <span>Temperature: {temp}</span>
                        <strong>Price:</strong> <span>${price}</span>
                    </Card.Text>
                    <div className="d-flex">
                        <Link to={`/products/${id}/edit`} className="btn btn-primary mx-2">Edit</Link>
                        <Button variant="danger" onClick={() => handleDeleteProduct(id)}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>

        )
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

export default Product