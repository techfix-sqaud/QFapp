import React, { useReducer } from "react";
import CartContext from "./CartContext";
import { cartReducer, initialState } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  function addItemToCart(item) {
    dispatch({ type: "ADD_ITEM", payload: item, totalQuantity: 0 });
  }

  function removeItemFromCart(itemId) {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  }

  function addQuantity(itemId) {
    dispatch({ type: "ADD_ITEM_QUANTITY", payload: itemId });
  }

  function removeQuantity(itemId) {
    dispatch({ type: "REMOVE_QUANTITY", payload: itemId });
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        addQuantity,
        removeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
