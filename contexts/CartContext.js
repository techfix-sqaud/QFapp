import React, { createContext } from "react";

const CartContext = createContext();

export default CartContext;

export const initialState = {
  items: [],
  totalQuantity: 0,
};
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity + action.payload.quantity,
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
          totalQuantity: state.totalQuantity + action.payload.quantity,
        };
      }
    case "REMOVE_ITEM":
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        const updatedItems = [...state.items];
        updatedItems.splice(itemIndex, 1);
        return {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity - item.quantity,
        };
      }
      return state;
    case "ADD_ITEM_QUANTITY":
      const addIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (state.items[addIndex]) {
        const updatedItems = [...state.items];
        updatedItems[addIndex].quantity++;
        return {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity + 1,
        };
      }
      return state;
    case "REMOVE_QUANTITY":
      const removeIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      let updatedItemsRemove = [];
      if (state.items[removeIndex]) {
        updatedItemsRemove = [...state.items];
        updatedItemsRemove[removeIndex].quantity--;
      }
      if (updatedItemsRemove[removeIndex].quantity < 1) {
        updatedItemsRemove.splice(removeIndex, 1);
      }
      return {
        ...state,
        items: updatedItemsRemove,
        totalQuantity: state.totalQuantity - 1,
      };
    default:
      return state;
  }
};
