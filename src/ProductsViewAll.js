import { Card, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import Alert from "react-bootstrap/Alert";
import { Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import "./style.css";

function ProductsViewAll() {
  let [products, setProducts] = useState([]);
  let [error, setError] = useState();

  let {
    getProductAll,
    deleteProduct,
    getSearch,
    getAsc,
    getDesc,
    getAlphabeticalAsc,
    getAlphabeticalDesc,
    getRange24,
    getRange45,
    getRange5,
  } = useContext(ProductContext);

  useEffect(() => {
    setError(null);
    async function fetch() {
      await getProductAll()
        .then((data) => setProducts(data))
        .catch((message) => setError(message));
    }
    fetch();
  }, [getProductAll]);

  function errorMessage() {
    return (
      <Alert variant="danger">
        There was an error attempting to load this product: {error}
      </Alert>
    );
  }

  function handleDeleteProduct(id) {
    deleteProduct(id);
    //may have to navigate to certain param after deleting or view function
  }

  const handleChange = async (event) => {
    const query = event.target.value;
    if (!query) {
      // If the search input is empty reset to show all the products
      const data = await getProductAll();
      setProducts(data);
      return;
    }
    try {
      const data = await getSearch(query);
      setProducts(data);
    } catch (err) {
      setError(err);
    }
  };

  function asc() {
    async function fetch() {
      await getAsc()
        .then((data) => setProducts(data))
        .catch((message) => setError(message));
    }
    fetch();
  }

  function desc() {
    async function fetch() {
      await getDesc()
        .then((data) => setProducts(data))
        .catch((message) => setError(message));
    }
    fetch();
  }

  function alphaA() {
    async function fetch() {
      await getAlphabeticalAsc()
        .then((data) => setProducts(data))
        .catch((message) => setError(message));
    }
    fetch();
  }

  function alphaD() {
    async function fetch() {
      await getAlphabeticalDesc()
        .then((data) => setProducts(data))
        .catch((message) => setError(message));
    }
    fetch();
  }

  function range1() {
    async function fetch() {
      await getRange24()
        .then((data) => setProducts(data))
        .catch((message) => setError(message));
    }
    fetch();
  }

  function range2() {
    async function fetch() {
      await getRange45()
        .then((data) => setProducts(data))
        .catch((message) => setError(message));
    }
    fetch();
  }

  function range3() {
    async function fetch() {
      await getRange5()
        .then((data) => setProducts(data))
        .catch((message) => setError(message));
    }
    fetch();
  }

  function mapCard(products) {
    return products.map((product) => productCard(product));
    function productCard(products) {
      let { id, itemName, price, image } = products;

      return (
        <Card
          key={id}
          className="bordercard card-design font d-inline-block align-top"
        >
          <Card.Body className="padding d-flex flex-column justify-content-center align-items-center">
            <Card.Img className="img" src={image} />
            <Card.Title>{itemName}</Card.Title>
            <Card.Text>
              <div>
                <strong>Price: ${price}</strong>
              </div>
            </Card.Text>
            <div
              style={{ transform: "scale(0.8)" }}
              className="d-flex align-items-center"
            >
              <Link
                to={`/${id}/full-view-all`}
                className="view btn btn-secondary ms-1"
              >
                View
              </Link>
              <Link
                to={`/${id}/edit-all`}
                className="edit btn btn-primary ms-1"
              >
                Edit
              </Link>
              <Button
                variant="danger"
                className="delete mx-1"
                onClick={() => handleDeleteProduct(id)}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      );
    }
  }

  return (
    <>
      <Container>
        <Row className="mx-auto">
          <Col className="mx-auto" md={12}>
            <div className="m-2 mx-auto">
              <Col className="toolsrow mx-auto" md={12}>
                <Row className="mx-auto">
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className="font"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={2}>
                    <Dropdown className="font">
                      <Dropdown.Toggle
                        className="sort"
                        variant="success"
                        id="dropdown-basic"
                      >
                        Sort
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={alphaA}>A-Z</Dropdown.Item>
                        <Dropdown.Item onClick={alphaD}>Z-A</Dropdown.Item>
                        <Dropdown.Item onClick={desc}>
                          Price High-Low
                        </Dropdown.Item>
                        <Dropdown.Item onClick={asc}>
                          Price Low-High
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Form></Form>
                  </Col>
                  <Col md={6}>
                    {["checkbox"].map((type) => (
                      <div
                        key={`inline-${type}`}
                        className="filterfont mt-2 d-flex justify-content-end"
                      >
                        <Form.Check
                          inline
                          label="$2-$4"
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                          onChange={range1}
                        />
                        <Form.Check
                          inline
                          label="$4-5$"
                          name="group1"
                          type={type}
                          id={`inline-${type}-2`}
                          onChange={range2}
                        />
                        <Form.Check
                          inline
                          label="$5+"
                          type={type}
                          id={`inline-${type}-3`}
                          onChange={range3}
                        />
                      </div>
                    ))}
                  </Col>
                </Row>
              </Col>

              <Row className="maincardpaddingx">
                <Col md={12} className="cardscenter">
                  {mapCard(products)}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductsViewAll;
