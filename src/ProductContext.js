import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const ProductContext = createContext()

export const ProductProvider = (props) => {
    const [products, setProducts] = useState([])
    

    //Everytime page rerenders useEffect is called. We have useEffect refreshing our server everytime page is rerendered
    useEffect(() => {
        async function getProducts() {
            await refreshProducts()
        }
        getProducts()
    }, []);

    //function that refreshed server and we change the state to the new refreshed data (server)
    async function refreshProducts() {
        const response = await axios.get("http://localhost:3001/products")
        setProducts(response.data)
    }

    //Get: Retrieve resources from server
    function getProduct(id) {
        console.log(id)
        return axios.get(`http://localhost:3001/products/${id}`)
            .then(response =>
                new Promise((resolve) => resolve(response.data))
            
            )
            .catch((error) =>
                new Promise((_, reject) => reject(error.response.statusText))
            )
    }

    //Delete: Remove resources from server
    function deleteProduct(id) {
        axios.delete(`http://localhost:3001/products/${id}`)
            .then(refreshProducts)
    }

    //Post: Create a new resource on server
    function addProduct(product) {
        return axios.post("http://localhost:3001/products", product) 
            .then(response => {
                refreshProducts(); 
                return response.data;
            })
            .catch(error => {
                console.error("Error adding product:", error);
                throw error; // Rethrow the error for further handling if needed
            });
    }

    //Put: Update an existing resource on the server
    function updateProduct(product) {
        return axios.put((`http://localhost:3001/products/${product.id}`), product)
            .then(response => {
                refreshProducts()
                return new Promise((resolve) => resolve(response.data))
            })
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                getProduct,
                deleteProduct,
                addProduct,
                updateProduct
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
}