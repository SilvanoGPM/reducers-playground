import { useEffect, useReducer } from "react";
import { useDebounce } from "../../../../hooks/use-debounce";
import { httpClient } from "../../../../lib/http-client";
import { fetchInitialState, fetchReducer } from "./reducer";

export function useFetch() {
  const [state, dispatch] = useReducer(fetchReducer, fetchInitialState);

  const { debounce } = useDebounce({ delay: 500 });

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const { data } = await httpClient(
          `https://rickandmortyapi.com/api/character?name=${state.search}`,
          {
            implemantation: "axios",
          }
        );

        if (data.error) {
          throw data.error;
        }

        dispatch({
          type: "success",
          payload: data.results || [],
        });
      } catch (error) {
        dispatch({
          type: "error",
          payload: error,
        });
      }
    }

    if (state.data.isLoading) {
      fetchCharacters();
    }
  }, [state]);

  function startFetch() {
    dispatch({
      type: "start",
      payload: undefined,
    });
  }

  function search(value: string) {
    dispatch({
      type: "search",
      payload: value,
    });

    debounce(startFetch);
  }

  return {
    state,

    actions: {
      startFetch,
      search,
    },
  };
}
