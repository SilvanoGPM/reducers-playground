import { act, renderHook } from "@testing-library/react";
import { useCart } from ".";
import { cartInitialState } from "./reducer";

describe("useCart hook", () => {
  it('should return an object with "state" and "actions" properties', () => {
    const { result } = renderHook(() => useCart());

    expect(result.current).toMatchObject({
      state: expect.objectContaining({
        cart: expect.any(Object),
        filteredItems: expect.any(Array),
      }),

      actions: expect.objectContaining({
        addToCart: expect.any(Function),
        removeFromCart: expect.any(Function),
        setSearch: expect.any(Function),
      }),
    });
  });

  it("should return the initial state of the cart", () => {
    const { result } = renderHook(() => useCart());

    const { state } = result.current;

    expect(state.cart).toMatchObject(cartInitialState);
  });

  it("should return the cart items updated when add a new item", () => {
    const { result } = renderHook(() => useCart());
    const { actions } = result.current;

    const item = {
      id: "123",
      image: "test-image-url.png",
      name: "Test Item",
      price: 100,
    };

    act(() => {
      actions.addToCart(item);
    });

    expect(result.current.state.filteredItems).toHaveLength(1);
    expect(result.current.state.filteredItems).toContainEqual(item);
  });

  it("should return the cart items updated when remove a item", () => {
    const { result } = renderHook(() => useCart());
    const { actions } = result.current;

    const item = {
      id: "123",
      image: "test-image-url.png",
      name: "Test Item",
      price: 100,
    };

    act(() => {
      actions.addToCart(item);
    });

    act(() => {
      actions.removeFromCart(item.id);
    });

    expect(result.current.state.filteredItems).toHaveLength(0);
  });

  it("should return the cart items filtered when search for a item", () => {
    const { result } = renderHook(() => useCart());
    const { actions } = result.current;

    const item = {
      id: "123",
      image: "test-image-url.png",
      name: "Test Item",
      price: 100,
    };

    act(() => {
      actions.addToCart(item);
    });

    act(() => {
      actions.setSearch("test");
    });

    expect(result.current.state.filteredItems).toHaveLength(1);
    expect(result.current.state.filteredItems).toContainEqual(item);

    act(() => {
      actions.setSearch("random");
    });

    expect(result.current.state.filteredItems).toHaveLength(0);
  });

  it("should return the cart all items when search for a item is empty", () => {
    const { result } = renderHook(() => useCart());
    const { actions } = result.current;

    const item = {
      id: "123",
      image: "test-image-url.png",
      name: "Test Item",
      price: 100,
    };

    act(() => {
      actions.addToCart(item);
    });

    act(() => {
      actions.setSearch("");
    });

    expect(result.current.state.filteredItems).toHaveLength(
      result.current.state.cart.items.length
    );
  });
});
