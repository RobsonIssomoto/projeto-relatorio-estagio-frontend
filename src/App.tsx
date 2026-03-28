import { Botao } from "./components/Botao";
import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <Botao texto="Salvar" />
        <Botao texto="Excluir" />
        <button onClick={() => setCount(count + 1)}>Count {count}</button>
      </div>
    </>
  );
}
