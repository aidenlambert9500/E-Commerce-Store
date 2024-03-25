import React, { createContext, useState, useEffect } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import ProductList from "./ProductList";
import Cart from "./Cart";

export const BasketContext = createContext(null);

function ShopPage() {
  const [basketItems, setBasketItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("basketItems") || "[]");
    setBasketItems(storedItems);

    let computedTotal = 0;
    for (let item of storedItems) {
      computedTotal += item.total;
    }
    setTotalCost(computedTotal);
  }, []);

  const addToBasket = (product) => {
    let foundInBasket = false;
    const updatedBasket = basketItems.map((item) => {
      if (item.id === product.id) {
        item.quantity += 1;
        item.total += product.price;
        foundInBasket = true;
      }
      return item;
    });

    if (!foundInBasket) {
      const newItem = {
        ...product,
        quantity: 1,
        total: product.price,
      };
      updatedBasket.push(newItem);
    }

    setBasketItems(updatedBasket);
    setTotalCost(prevCost => prevCost + product.price);
    localStorage.setItem("basketItems", JSON.stringify(updatedBasket));
    localStorage.setItem("basketTotalCost", JSON.stringify(totalCost));
  };

  const removeFromBasket = (product) => {
    const updatedBasket = basketItems.reduce((acc, item) => {
      if (item.id === product.id) {
        item.quantity -= 1;
        item.total -= product.price;
        if (item.quantity > 0) acc.push(item);
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    setBasketItems(updatedBasket);
    setTotalCost(prevCost => prevCost - product.price);
    localStorage.setItem("basketItems", JSON.stringify(updatedBasket));
  };

  return (
    <div className="shop-page">
      <Header />
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <ProductList addToBasket={addToBasket} />
            </td>
            <td style={{ verticalAlign: "top" }}>
              <Cart
                removeFromBasket={removeFromBasket}
                totalCost={totalCost}
                basketItems={basketItems}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default ShopPage;
