import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// 1. Definição de TODOS os estilos necessários
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  sectionInfo: {
    marginBottom: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  textoInfo: {
    fontSize: 11,
    marginBottom: 6,
    color: "#333333",
  },
  subtitulo: {
    fontSize: 12,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "bold",
  },
  resumoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eeeeee",
    padding: 10,
    marginBottom: 15,
  },
  col: {
    fontSize: 11,
  },
  observacaoSection: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#fffde7",
    borderLeftWidth: 3,
    borderLeftColor: "#fbc02d",
  },
  assinaturaBox: {
    marginTop: 80,
    alignItems: "center",
  },
  linhaAssinatura: {
    width: "60%",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginBottom: 6,
  },
  textoAssinatura: {
    fontSize: 10,
    color: "#555555",
  },
});

// 2. Tipagem alinhada com a tabela (IRelatorio)
export interface RelatorioPDFProps {
  dadosRelatorio: {
    _id: string;
    mesReferencia: string;
    horasRealizadas: number;
    status: string;
    observacao?: string;
  };
  usuarioNome: string;
}

// 3. Componente do PDF
export const RelatorioFatecPDF = ({ dadosRelatorio, usuarioNome }: RelatorioPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* CABEÇALHO */}
      <View>
        <Text style={styles.header}>Relatório Mensal de Atividades de Estágio</Text>
      </View>

      {/* DADOS DO ESTAGIÁRIO */}
      <View style={styles.sectionInfo}>
        <Text style={styles.textoInfo}>Estagiário(a): {usuarioNome}</Text>
        <Text style={styles.textoInfo}>Mês de Referência: {dadosRelatorio.mesReferencia}</Text>
        <Text style={styles.textoInfo}>Código do Documento: {dadosRelatorio._id}</Text>
      </View>

      {/* SUBTÍTULO */}
      <Text style={styles.subtitulo}>Resumo das Atividades do Período:</Text>

      {/* QUADRO DE HORAS */}
      <View style={styles.resumoBox}>
        <Text style={styles.col}>Total de Horas Computadas no Mês:</Text>
        <Text style={styles.col}>{dadosRelatorio.horasRealizadas} horas</Text>
      </View>

      {/* QUADRO DE SITUAÇÃO */}
      <View style={styles.resumoBox}>
        <Text style={styles.col}>Situação Atual do Relatório:</Text>
        <Text style={styles.col}>{dadosRelatorio.status}</Text>
      </View>

      {/* SE HOUVER OBSERVAÇÃO (DEVOLUÇÃO) */}
      {dadosRelatorio.observacao && (
        <View style={styles.observacaoSection}>
          <Text style={[styles.col, { fontWeight: "bold", marginBottom: 4 }]}>Observações do Supervisor:</Text>
          <Text style={styles.col}>{dadosRelatorio.observacao}</Text>
        </View>
      )}

      {/* ÁREA DE ASSINATURA */}
      <View style={styles.assinaturaBox}>
        <View style={styles.linhaAssinatura}></View>
        <Text style={styles.textoAssinatura}>Assinatura do Supervisor da Empresa Concedente</Text>
      </View>
    </Page>
  </Document>
);
