import React, {useState} from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import Footer from "./Footer";
import Cart from "./Cart";


const Productpage = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
      setCartItems(prevItems => [...prevItems, item]);
    };
  
    return (
    <div className="product-page">
      <Header />
      <table>
        <tr>
          <td>
            <ProductList addToCart={addToCart} />
          </td>
          <td style={{ verticalAlign: "top" }}>
            <Cart />
          </td>
        </tr>
      </table>
      <Footer />
    </div>
  );
};
export default Productpage;
