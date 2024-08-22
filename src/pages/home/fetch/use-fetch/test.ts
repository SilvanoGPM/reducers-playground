import { act, renderHook, waitFor } from "@testing-library/react";

import { useFetch } from ".";
import { fetchInitialState } from "./reducer";

import { httpClient } from "../../../../lib/http-client";

jest.mock("../../../../lib/http-client");

const httpClientMock = httpClient as jest.Mock;

const apiResponseMock = {
  data: {
    results: [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
    ],
  },
};

describe("useFetch hook", () => {
  beforeEach(() => {
    httpClientMock.mockClear();
  });

  it('should return an object with "state" and "actions" properties', () => {
    const { result } = renderHook(() => useFetch());

    expect(result.current).toMatchObject({
      state: expect.any(Object),

      actions: expect.objectContaining({
        startFetch: expect.any(Function),
        search: expect.any(Function),
      }),
    });
  });

  it("should return the initial state of the fetch", () => {
    const { result } = renderHook(() => useFetch());

    const { state } = result.current;

    expect(state).toMatchObject(fetchInitialState);
  });

  it("should return the fetched data when start fetch", async () => {
    const apiMock = httpClientMock.mockReturnValueOnce(apiResponseMock);

    const { result } = renderHook(() => useFetch());
    const { actions } = result.current;

    act(() => {
      actions.startFetch();
    });

    await waitFor(() => {
      expect(apiMock).toHaveBeenCalled();
      expect(result.current.state.data.isLoading).toBe(false);
      expect(result.current.state.data.error).toBe(null);
      expect(result.current.state.data.items).toHaveLength(1);
      expect(result.current.state.data.items[0].name).toEqual("Rick Sanchez");
    });
  });

  it("should return the fetched data when search for characters", async () => {
    const apiMockWithResults =
      httpClientMock.mockReturnValueOnce(apiResponseMock);

    const { result } = renderHook(() => useFetch());
    const { actions } = result.current;

    act(() => {
      actions.search("rick");
    });

    await waitFor(() => {
      expect(apiMockWithResults).toHaveBeenCalled();
      expect(result.current.state.search).toBe("rick");
      expect(result.current.state.data.isLoading).toBe(false);
      expect(result.current.state.data.error).toBe(null);
      expect(result.current.state.data.items).toHaveLength(1);
      expect(result.current.state.data.items[0].name).toEqual("Rick Sanchez");
    });

    const apiMockWithoutResults = httpClientMock.mockReturnValueOnce({
      data: {
        results: [],
      },
    });

    act(() => {
      actions.search("morty");
    });

    await waitFor(() => {
      expect(apiMockWithoutResults).toHaveBeenCalled();
      expect(result.current.state.search).toBe("morty");
      expect(result.current.state.data.isLoading).toBe(false);
      expect(result.current.state.data.error).toBe(null);
      expect(result.current.state.data.items).toHaveLength(0);
    });
  });

  it("should return the error when fetch fails", async () => {
    const apiMock = httpClientMock.mockReturnValue({
      data: {
        error: "Something went wrong",
      },
    });

    const { result } = renderHook(() => useFetch());
    const { actions } = result.current;

    act(() => {
      actions.startFetch();
    });

    await waitFor(() => {
      expect(apiMock).toHaveBeenCalled();
      expect(result.current.state.data.isLoading).toBe(false);
      expect(result.current.state.data.error).toEqual("Something went wrong");
      expect(result.current.state.data.items).toHaveLength(0);
    });

    act(() => {
      actions.search("error");
    });

    await waitFor(() => {
      expect(apiMock).toHaveBeenCalledTimes(2);
      expect(result.current.state.search).toBe("error");
      expect(result.current.state.data.isLoading).toBe(false);
      expect(result.current.state.data.error).toEqual("Something went wrong");
      expect(result.current.state.data.items).toHaveLength(0);
    });
  });
});
