import { PieChart } from "@mui/x-charts/PieChart";

interface GraficoTechProps {
  dados?: { nome: string; valor: number }[];
}

export function GraficoHoras({ dados = [] }: GraficoTechProps) {
  // 1. Calcula o total absoluto de utilizações para descobrir o 100%
  const total = dados.reduce((acc, curr) => acc + curr.valor, 0);

  // 2. Transforma os dados e insere a % direto no texto da legenda
  const formatData = dados.map((d, index) => {
    // Calcula a porcentagem (Ex: Se usou 4 vezes num total de 8, dá 50.0)
    const porcentagem = total > 0 ? ((d.valor / total) * 100).toFixed(1) : "0.0";

    // Remove o ".0" caso seja um número redondo (ex: 50.0% vira 50%)
    const textoPorcentagem = porcentagem.endsWith(".0") ? porcentagem.slice(0, -2) : porcentagem;

    return {
      id: index,
      value: d.valor, // O gráfico usa o valor real para calcular o tamanho da fatia
      label: `${d.nome} (${textoPorcentagem}%)`, // <--- A legenda mostra a Porcentagem!
    };
  });

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
      }}>
      {/* O título*/}
      <h3 style={{ textAlign: "left", marginBottom: "20px", color: "#333" }}>Tecnologias Utilizadas</h3>

      {dados.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888", margin: "40px 0" }}>Nenhuma tecnologia registrada ainda.</p>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <PieChart
            series={[
              {
                data: formatData,
                innerRadius: 40,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                highlightScope: { fade: "global", highlight: "item" },
                faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              },
            ]}
            width={500}
            height={250}
            slotProps={{
              legend: {
                position: { vertical: "middle", horizontal: "start" },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
