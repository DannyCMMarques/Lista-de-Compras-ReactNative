import { DIAS_POR_MES, MESES_POR_ANO, MILIS_POR_DIA, UM_ANO, UM_DIA, UM_MES } from "../utils/constants/indicadores_tempo";

export const useContadorDeTempo = (data: Date | string): string => {
  const agora = new Date();
  const informada = new Date(data);

  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const diaInformado = new Date(
    informada.getFullYear(),
    informada.getMonth(),
    informada.getDate()
  );

  const diferencaEmMilissegundos = hoje.getTime() - diaInformado.getTime();
  const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (MILIS_POR_DIA));

  if (diferencaEmDias === 0) return "Hoje";
  if (diferencaEmDias === UM_DIA) return "Ontem";
  if (diferencaEmDias < DIAS_POR_MES) return `${diferencaEmDias} dias atrás`;

  const diferencaEmMeses = Math.floor(diferencaEmDias / DIAS_POR_MES);
  if (diferencaEmMeses < MESES_POR_ANO) {
    return diferencaEmMeses === UM_MES
      ? "1 mês atrás"
      : `${diferencaEmMeses} meses atrás`;
  }

  const diferencaEmAnos = Math.floor(diferencaEmMeses / MESES_POR_ANO);
  return diferencaEmAnos === UM_ANO
    ? "1 ano atrás"
    : `${diferencaEmAnos} anos atrás`;
};
