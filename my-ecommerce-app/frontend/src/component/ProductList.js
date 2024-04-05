import React, {useState, useEffect} from "react";
import ProductItem from "./ProductItem";


function ProductList(props) {
  const [products, setProducts] = useState([]);
  
  // gets the products from the backend
  useEffect(() => {
  fetch("http://localhost:5000/Productpage")
    .then((response) => response.json())
    .then((data) => {     
      setProducts(data);
  })},[]);

  return (
    <div className="product-list">
      <ProductItem products={products} handleCartAdd={props.handleCartAdd} />
    </div>
  );
}
export default ProductList;