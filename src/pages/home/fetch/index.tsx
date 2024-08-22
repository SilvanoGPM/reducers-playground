import { useFetch } from "./use-fetch";

export function FetchTab() {
  const { state, actions } = useFetch();

  return (
    <>
      <h1 className="text-4xl font-bold">Procurar personagens</h1>
      <span className="text-lg text-gray-400 mb-4">(Reducers Playground)</span>

      <div className="w-full flex flex-col gap-4">
        <input
          type="text"
          className="border-2 border-black rounded-md p-2"
          placeholder="Pesquisar"
          value={state.search}
          onChange={(e) => actions.search(e.target.value)}
        />
      </div>

      {state.data.isLoading && (
        <p className="text-center text-lg text-gray-400 mt-8">
          {" "}
          Procurando personagens...{" "}
        </p>
      )}

      {!state.data.isLoading && state.data.items.length === 0 && (
        <p className="text-center text-lg text-gray-400 mt-8">
          {" "}
          Nenhum personagem encontrado{" "}
        </p>
      )}

      <ul className="w-full flex flex-col gap-4 mt-8">
        {state.data.items.map((character) => (
          <li key={character.id} className="flex justify-between gap-2 pt-2">
            <div className="flex gap-2">
              <img src={character.image} className="w-16 h-16" />

              <div className="flex flex-col justify-center">
                <h3 className="text-lg">{character.name}</h3>
                <p className="text-sm">
                  {character.species + "-" + character.status}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
