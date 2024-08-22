import { createReducer } from "../../../../stores/create-reducer";

export interface Item {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface FetchState {
  search: string;

  data: {
    items: Item[];
    error: unknown;
    isLoading: boolean;
  };
}

export type FetchActions =
  | { type: "start"; payload: void }
  | { type: "success"; payload: Item[] }
  | { type: "error"; payload: unknown }
  | { type: "search"; payload: string };

export const fetchInitialState: FetchState = {
  search: "",

  data: {
    items: [],
    error: null,
    isLoading: false,
  },
};

export const fetchReducer = createReducer<FetchState, FetchActions>({
  start: (state) => {
    state.data = { items: [], error: null, isLoading: true };
  },

  success: (state, payload) => {
    state.data = { items: payload, error: null, isLoading: false };
  },

  error: (state, payload) => {
    state.data = { items: [], error: payload, isLoading: false };
  },

  search: (state, payload) => {
    state.search = payload;
  },
});
