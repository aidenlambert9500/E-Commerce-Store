import React, { createContext, useState, useEffect, useContext } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import ProductList from "./ProductList";
import CartView from "./Cart";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext";

export const CartContext = createContext(null);


function Productpage() {
  const { loggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  
  useEffect(() => {
    if (!loggedIn){
      navigate('/Login');
      return;
    }
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartProducts(storedCartItems);

    const total = storedCartItems.reduce((acc, currentItem) => acc + currentItem.total, 0);
    setCartTotal(total);
  }, [loggedIn, navigate]);


  const addToCart = (product) => {
    const updatedCartItems = cartProducts.map(item => ({ ...item }));
    const existingProductIndex = updatedCartItems.findIndex(item => item.id === product.id);

    if (existingProductIndex >= 0) {
      updatedCartItems[existingProductIndex].quantity += 1;
      updatedCartItems[existingProductIndex].total += product.price;
    } else {
      updatedCartItems.push({ ...product, quantity: 1, total: product.price });
    }

    setCartProducts(updatedCartItems);
    setCartTotal(prevTotal => prevTotal + product.price);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    localStorage.setItem("totalPrice", cartTotal + product.price);
  };

  const removeFromCart = (product) => {
    let newCartTotal = cartTotal;
    const updatedCartItems = cartProducts.filter(item => {
      if (item.id === product.id) {
        newCartTotal -= item.price * item.quantity;
        return false;
      }
      return true;
    });

    setCartProducts(updatedCartItems);
    setCartTotal(newCartTotal);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <div className="product-page">
      <Header />
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <ProductList handleCartAdd={addToCart} />
            </td>
            <td style={{ verticalAlign: "top" }}>
              <CartView
                handleCartRemove={removeFromCart}
                totalPrice={cartTotal}
                cartItems={cartProducts}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default Productpage;

