// src/pages/Auth/Cadastro/Cadastro.tsx
import { useState } from "react";

// Importamos as 3 peças de Lego!
import SelecaoPerfil from "./components/SelecaoPerfil";
import FormEstagiario from "./components/FormEstagiario";
import FormEmpresa from "./components/FormRepresentante";

export default function Cadastro() {
  // A "memória" que diz qual tela mostrar
  const [etapa, setEtapa] = useState<"selecao" | "estagiario" | "empresa">("selecao");

  // O React lê de cima para baixo. Ele mostra o componente que bater com a etapa atual.
  if (etapa === "estagiario") {
    return <FormEstagiario setEtapa={setEtapa} />;
  }

  if (etapa === "empresa") {
    return <FormEmpresa setEtapa={setEtapa} />;
  }

  // Se não for nenhum dos dois acima, o padrão é a seleção
  return <SelecaoPerfil setEtapa={setEtapa} />;
}
