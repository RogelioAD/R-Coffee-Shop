import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);

  //Everytime page rerenders useEffect is called. We have useEffect refreshing our server everytime page is rerendered
  useEffect(() => {
    async function getProducts() {
      await refreshProducts();
    }
    getProducts();
  }, []);

  //function that refreshed server and we change the state to the new refreshed data (server)
  async function refreshProducts() {
    const response = await axios.get("http://localhost:3001/products");
    setProducts(response.data);
  }

  //Get: Retrieve resources from server
  function getProductAll() {
    return axios
      .get(`http://localhost:3001/products`)
      .then((response) => new Promise((resolve) => resolve(response.data)))
      .catch(
        (error) => new Promise((_, reject) => reject(error.response.statusText))
      );
  }

  function getProductId(id) {
    return axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => new Promise((resolve) => resolve(response.data)))
      .catch(
        (error) => new Promise((_, reject) => reject(error.response.statusText))
      );
  }

  //Delete: Remove resources from server
  function deleteProduct(id) {
    axios.delete(`http://localhost:3001/products/${id}`).then(refreshProducts);
  }

  //Post: Create a new resource on server
  function addProduct(product) {
    return axios
      .post("http://localhost:3001/products", product)
      .then((response) => {
        refreshProducts();
        return response.data;
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        throw error; // Rethrow the error for further handling if needed
      });
  }

  //Put: Update an existing resource on the server
  function updateProduct(product) {
    return axios
      .put(`http://localhost:3001/products/${product.id}`, product)
      .then((response) => {
        refreshProducts();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function getSearch(query) {
    console.log("query: " + query);

    return axios
      .get(`http://localhost:3001/products?itemName_like=${query}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  }

  function getAsc() {
    return axios
      .get(`http://localhost:3001/products?_sort=price&_order=asc`)
      .then((response) => {
        return response.data;
      });
  }

  function getDesc() {
    return axios
      .get(`http://localhost:3001/products?_sort=price&_order=desc`)
      .then((response) => {
        return response.data;
      });
  }

  function getAlphabeticalAsc() {
    return axios
      .get(`http://localhost:3001/products?_sort=itemName&_order=asc`)
      .then((response) => {
        return response.data;
      });
  }

  function getAlphabeticalDesc() {
    return axios
      .get(`http://localhost:3001/products?_sort=itemName&_order=desc`)
      .then((response) => {
        return response.data;
      });
  }

  function getRange24() {
    return axios
      .get(
        `http://localhost:3001/products?_sort=price&_order=asc&price_lte=4&price_gte=2`
      )
      .then((response) => {
        return response.data;
      });
  }

  function getRange45() {
    return axios
      .get(
        `http://localhost:3001/products?_sort=price&_order=asc&price_lte=5&price_gte=4`
      )
      .then((response) => {
        return response.data;
      });
  }

  function getRange5() {
    return axios
      .get(`http://localhost:3001/products?_sort=price&_order=asc&price_gte=5`)
      .then((response) => {
        return response.data;
      });
  }
  return (
    <ProductContext.Provider
      value={{
        products,
        getProductAll,
        getProductId,
        deleteProduct,
        addProduct,
        updateProduct,
        getSearch,
        getAsc,
        getDesc,
        getAlphabeticalAsc,
        getAlphabeticalDesc,
        getRange24,
        getRange45,
        getRange5,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
