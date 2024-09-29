import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { ProductContext } from './ProductContext';

function CreateProduct() {
    let [product, setProduct] = useState({
        itemName: "",
        description: "",
        temp:"",
        price: 0,
        image:""
    })

    let { addProduct } = useContext(ProductContext)
    let navigate = useNavigate()

    let { itemName, description, temp, price, image } = product

    function handleChange(event) {
        setProduct((preValue) => {
          return { ...preValue, [event.target.name]: event.target.value }})
      }

    function addNewProduct(){
        addProduct(product)
    }

    function handleSubmit(event){
        event.preventDefault()
        addNewProduct()
        navigate('/view-all')
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
                    <Form.Control type="text" placeholder="Describe Product" value={description} onChange={handleChange} name='description'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="temp">
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control type="text" placeholder="Hot or Cold" value={temp} onChange={handleChange} name='temp'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Price" value={price} onChange={handleChange} name='price'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" placeholder="Paste Image URL" value={image} onChange={handleChange} name='image'/>
                </Form.Group>
                <Button className="formbutton" variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        );
    }

    return (form())
}

export default CreateProduct