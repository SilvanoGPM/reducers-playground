import { useState } from "react";
import { CartTab } from "./cart";
import { FetchTab } from "./fetch";

export function Home() {
  const [tab, setTab] = useState("cart");

  return (
    <main className="max-w-[600px] w-full mx-auto flex flex-col h-dvh items-center justify-start p-8">
      <div className="flex flex-col gap-4 my-8">
        <button className="bg-blue-500 text-white rounded-lg p-2" onClick={() => setTab("cart")}>Carrinho</button>
        <button className="bg-blue-500 text-white rounded-lg p-2" onClick={() => setTab("characters")}>Personagens</button>
      </div>

      {tab === "cart" && <CartTab />}
      {tab === "characters" && <FetchTab />}
    </main>
  );
}
