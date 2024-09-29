import { Card } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap"

function ProductFullView(){
  let params = useParams()

  let [product, setProducts] = useState([])
  let { getProductId , deleteProduct } = useContext(ProductContext)
  let { id, itemName, description, temp, price, image } = product

  let navigate = useNavigate()


  console.log(params.productID)
  useEffect(() => {
    if (params.productID === undefined) return
    async function fetch() {
      await getProductId(params.productID)
        .then((product) => setProducts(product))
      console.log("get " + params.productID)
      console.log(product)
      console.log("product " + id)
    }
    fetch()
  }, [params.productID])

  function handleDeleteProduct(id) {
    deleteProduct(id)
    navigate('/view-all')
}


return (
  <div className="fullmaincardpaddingx">
    <Card key={id} className="bordercard fullcard-design font d-inline-block align-top">
      <Card.Body className="padding d-flex flex-column justify-content-center align-items-center">
          <Card.Img className="fullimg" src={image} />
          <Card.Title>{itemName}</Card.Title>
          <Card.Text>
              <div>
              <strong>Price: ${price}</strong>
              <h6>Temperature: {temp}</h6>
              <div>
                {description}
              </div>
                
              </div>
          </Card.Text>
          <div style={{ transform: 'scale(0.8)' }} className="d-flex align-items-center">
              <Link to={`/${id}/fulledit`} className="edit btn btn-primary ms-1">Edit</Link>
              <Button variant="danger" className="delete mx-1" onClick={() => handleDeleteProduct(id)}>Delete</Button>
          </div>
      </Card.Body>
  </Card>
  </div>
  
);
};

export default ProductFullView