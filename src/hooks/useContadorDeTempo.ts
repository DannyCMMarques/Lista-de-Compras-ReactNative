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
  const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

  if (diferencaEmDias === 0) return "Hoje";
  if (diferencaEmDias === 1) return "Ontem";
  if (diferencaEmDias < 30) return `${diferencaEmDias} dias atrás`;

  const diferencaEmMeses = Math.floor(diferencaEmDias / 30);
  if (diferencaEmMeses < 12) {
    return diferencaEmMeses === 1
      ? "1 mês atrás"
      : `${diferencaEmMeses} meses atrás`;
  }

  const diferencaEmAnos = Math.floor(diferencaEmMeses / 12);
  return diferencaEmAnos === 1
    ? "1 ano atrás"
    : `${diferencaEmAnos} anos atrás`;
};
