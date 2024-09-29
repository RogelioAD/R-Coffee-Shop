import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import ProductsHome from "./ProductsHome";
import Products from "./ProductsViewAll";
import ProductFullView from "./ProductFullView";
import SingleView from "./ProductFullView";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import ProductFullViewAll from "./ProductFullViewAll";
import EditProductAll from "./EditProductAll";

function App() {
  return (
    <div className="background">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<ProductsHome />} />
            <Route path="about-us" element={<About />} />
            <Route path="view-all" element={<Products />} />
            <Route path=":productID/fullview" element={<ProductFullView />} />
            <Route path=":productID/fullview/edit" element={<EditProduct />} />
            <Route path=":productID/edit-home" element={<EditProduct />} />
            <Route path=":productID/edit" element={<EditProduct />} />
            <Route path=":productID/fulledit" element={<EditProduct />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path=":productID/full" element={<SingleView />} />
            <Route path=":productID/fullall" element={<SingleView />} />
            <Route path=":productID/edit-all" element={<EditProductAll />} />
            <Route
              path=":productID/full-view-all"
              element={<ProductFullViewAll />}
            />
            <Route path="/:productID/full/edit" element={<EditProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
