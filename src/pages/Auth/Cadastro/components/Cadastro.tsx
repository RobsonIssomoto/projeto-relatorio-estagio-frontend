import { useState } from "react";
import SelecaoPerfil from "./SelecaoPerfil";
import FormEstagiario from "./FormEstagiario";
import FormRepresentante from "./FormRepresentante";

export default function Cadastro() {
  const [etapa, setEtapa] = useState<"selecao" | "estagiario" | "empresa">("selecao");

  return (
    <>
      {etapa === "selecao" && <SelecaoPerfil setEtapa={setEtapa} />}

      {etapa === "estagiario" && <FormEstagiario setEtapa={setEtapa} />}

      {etapa === "empresa" && <FormRepresentante setEtapa={setEtapa} />}
    </>
  );
}
