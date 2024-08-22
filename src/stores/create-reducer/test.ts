import { createReducer } from ".";

it("should create a reducer", () => {
  type StateAction =
    | { type: "ADD"; payload: number }
    | { type: "SUBTRACT"; payload: number };

  const reducer = createReducer<{ counter: number }, StateAction>({
    ADD: (state, payload) => {
      state.counter += payload;
    },

    SUBTRACT: (state, payload) => {
      state.counter -= payload;
    },
  });

  const afterAddAction = reducer({ counter: 0 }, { type: "ADD", payload: 1 });

  const afterSubtractAction = reducer(
    { counter: 0 },
    { type: "SUBTRACT", payload: 1 }
  );

  expect(afterAddAction.counter).toBe(1);
  expect(afterSubtractAction.counter).toBe(-1);

  // Mismatched action type
  const type = "UNKNOWN" as StateAction["type"];
  
  const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

  const afterUnknownAction = reducer({ counter: 0 }, { type, payload: 1 });
  
  expect(afterUnknownAction.counter).toBe(0);

  expect(warnSpy).toHaveBeenCalledWith(
    `Nenhuma ação com o tipo ${type} encontrada.`
  );

  warnSpy.mockRestore();
});
