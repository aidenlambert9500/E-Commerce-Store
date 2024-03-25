import React, { useEffect } from "react";
import { useState } from "react";

function ProductItem(props) {
  const [showDescription, setShowDescription] = useState(false);
  const [productHoverID, setProductHover] = useState(0);

  return props.products.map(function (product) {
    return (
      <div className="product-item" id={product.id}>
        <div className="product-image">
          <img
            style={{ height: "300px" }}
            src={product.image}
            alt={product.name}
          />
        </div>
        <div
          className="product-name"
          onMouseEnter={() => {
            setShowDescription(true);
            setProductHover(product.id);
          }}
          onMouseLeave={() => setShowDescription(false)}
        >
          {product.name}
        </div>
        <div className="product-price">Price: ${product.price}</div>
        <button type="button" onClick={() => props.handleCartAdd(product)}>
          Add to Cart
        </button>
        {showDescription && productHoverID === product.id && (
          <div>{product.description}</div>
        )}
      </div>
    );
  });
}
export default ProductItem;