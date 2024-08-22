import { useCallback, useReducer } from "react";

import { AddToCartPayload, cartInitialState, cartReducer } from "./reducer";

export function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = useCallback((item: AddToCartPayload) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        productId: id,
      },
    });
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "SET_SEARCH",
      payload: {
        search,
      },
    });
  }, []);

  const filteredItems = cart.items.filter((item) => {
    return item.name.toLowerCase().includes(cart.search.toLowerCase());
  });

  return {
    state: {
      cart,
      filteredItems,
    },

    actions: {
      addToCart,
      removeFromCart,
      setSearch,
    },
  };
}
