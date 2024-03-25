import React, { useState } from "react";


function ProductItem({ product, props }) {
  const [hovering, setHovering] = useState(false);
  
  return (
    <div className="product-item">
      <img
        src={process.env.PUBLIC_URL + product.image}
        alt={product.name}
        height="250px"
      />
      <p
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}>
        {product.name}
      </p>
        {hovering && <p>{product.description}</p>}
      <p>Price: ${product.price}</p>
      <button type="button" onClick={()=>props.handleCartAdd(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;
