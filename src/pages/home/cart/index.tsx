import { useCart } from "./use-cart";

export function CartTab() {
  const { state, actions } = useCart();

  return (
    <>
      <h1 className="text-4xl font-bold">Carrinho</h1>
      <span className="text-lg text-gray-400 mb-4">(Reducers Playground)</span>

      <div className="w-full flex flex-col gap-4">
        <button
          className="bg-green-500 text-white rounded-lg p-2"
          onClick={() => {
            actions.addToCart({
              id: crypto.randomUUID(),
              image: "https://picsum.photos/id/10/200/300",
              name: `Item aleátório ${Math.round(Math.random() * 1000)}`,
              price: Math.round(Math.random() * 1000),
            });
          }}
        >
          + Adicionar novo item
        </button>

        <input
          type="text"
          className="border-2 border-black rounded-md p-2"
          placeholder="Pesquisar"
          value={state.cart.search}
          onChange={(e) => actions.setSearch(e.target.value)}
        />
      </div>

      {state.filteredItems.length === 0 && (
        <p className="text-center text-lg text-gray-400 mt-8">
          {" "}
          Nenhum item encontrado{" "}
        </p>
      )}

      <ul className="w-full flex flex-col gap-4 mt-8">
        {state.filteredItems.map((item) => (
          <li key={item.id} className="flex justify-between gap-2 pt-2">
            <div className="flex gap-2">
              <img src={item.image} className="w-16 h-16" />

              <div className="flex flex-col justify-center">
                <h3 className="text-lg">{item.name}</h3>
                <p className="text-sm">R$ {item.price}</p>
              </div>
            </div>

            <button
              className="bg-red-500 text-white rounded-full size-8"
              onClick={() => actions.removeFromCart(item.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
