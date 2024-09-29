import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from './ProductContext';

function EditProduct() {
    let params = useParams()
    let location = useLocation()
    let [product, setProduct] = useState({
        id: params.productID,
        itemName: "",
        description: "",
        temp: "",
        price: 0,
        image: ""
    })



    let { getProductId, updateProduct } = useContext(ProductContext)
    let navigate = useNavigate()

    let { id, itemName, description, temp, price, image } = product
    console.log(id)

    useEffect(() => {
        if (id === undefined) return
        async function fetch() {
            await getProductId(id)
                .then((product) => setProduct(product))
        }
        fetch()
    }, [id])

    function handleChange(event) {
        setProduct((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        })
    }

    function editProduct() {
        updateProduct(product)
    }

    function handleSubmit(event) {
        event.preventDefault()
        editProduct()
        const pathSegments = location.pathname.split('/');

        // Get the last segment
        const lastSegment = pathSegments[pathSegments.length - 1];
        const secondLastSegment = pathSegments[pathSegments.length - 2];

        // Check if the last segment is 'edit-home'
        if (lastSegment === 'edit-home' || lastSegment === 'fulledit') {
            navigate('/');
        } else if (secondLastSegment === 'fullview'){
            navigate('/')
        }else
        {
            navigate('/view-all');
        }

    }

    function form() {
        return (
            <Form onSubmit={handleSubmit} className="mx-auto" style={{ width: '33%', marginTop: '40px' }}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Product Name" value={itemName} onChange={handleChange} name='itemName' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Describe Product" value={description} onChange={handleChange} name='description' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="temp">
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control type="text" placeholder="Hot or Cold" value={temp} onChange={handleChange} name='temp' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Price" value={price} onChange={handleChange} name='price' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" placeholder="Paste Image URL" value={image} onChange={handleChange} name='image' />
                </Form.Group>
                <Button className='formbutton' variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        );
    }

    return (form())
}

export default EditProduct