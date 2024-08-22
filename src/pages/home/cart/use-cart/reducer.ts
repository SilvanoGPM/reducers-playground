import { createReducer } from "../../../../stores/create-reducer";

export interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
}

export interface CartState {
  items: CartItem[];
  search: string;
}

export type AddToCartPayload = CartItem;
export type RemoveFromCartPayload = { productId?: string };
export type SetFilterPayload = { search: string };

// Possíveis ações com seus respectivos tipos de dados (payload)
export type CartActions =
  | { type: "ADD_TO_CART"; payload: AddToCartPayload }
  | { type: "REMOVE_FROM_CART"; payload: RemoveFromCartPayload }
  | { type: "SET_SEARCH"; payload: SetFilterPayload };

// Estado inicial
export const cartInitialState: CartState = {
  search: "",
  items: [],
};

export const cartReducer = createReducer<CartState, CartActions>({
  ADD_TO_CART: (state, payload) => {
    // Como utilizamos immer.js não é necessário (mesmo que também seja aceito) recriar um novo objeto com
    // { ...state, items: [...state.items, payload] }
    state.items.push(payload);
  },

  REMOVE_FROM_CART: (state, { productId }) => {
    state.items = state.items.filter((item) => item.id !== productId);
  },

  SET_SEARCH: (state, { search }) => {
    state.search = search;
  },
});
