import React from "react";

function CartItem(props) {
  return props.cartItems.map(function (product) {
    return (
      <div className="product-item" id={product.id}>
        <div className="product-image">
          <img
            style={{ height: "300px" }}
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="product-name">{product.name}</div>
        <div className="product-price">Price: ${product.price}</div>
        <div className="product-quantity">Quantity: {product.quantity}</div>
        <div className="product-total">Total: ${product.total.toFixed(2)}</div>
        <button
          type="button"
          onClick={() => {
            props.handleCartRemove(product);
          }}
        >
          Remove
        </button>
      </div>
    );
  });
}  export default CartItem;