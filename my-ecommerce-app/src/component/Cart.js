import React from 'react';
import CartItem from './CartItem'; // Import the CartItem component

function Cart(props){
  return(
    <div className="shopping=cart">
        <h1>Shopping Cart</h1>

        {props.cartItems.length!==0 && (<div className="productList">
        <CartItem handleCartRemove={props.handleCartRemove} cartItems={props.cartItems} />
        </div>)}
        <div className="cartTotal">Total (in cart): ${Math.abs(props.totalPrice).toFixed(2)}</div>
    </div>
);
}

export default Cart;