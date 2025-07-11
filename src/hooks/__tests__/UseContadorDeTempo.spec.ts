

import { useContadorDeTempo } from "../useContadorDeTempo";


const hoje = new Date('2025-07-10T12:00:00Z'); 

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(hoje);
});

afterAll(() => {
  jest.useRealTimers();
});

describe('useContadorDeTempo', () => {
  it('retorna "Hoje" quando a data é o mesmo dia', () => {
    const resultado = useContadorDeTempo('2025-07-10T08:00:00Z');
    expect(resultado).toBe('Hoje');
  });

  it('retorna "Ontem" quando a data é um dia antes', () => {
    const resultado = useContadorDeTempo('2025-07-09T12:00:00Z');
    expect(resultado).toBe('Ontem');
  });

  it('retorna "X dias atrás" para menos de 30 dias', () => {
    const resultado = useContadorDeTempo('2025-06-25T12:00:00Z'); 
    expect(resultado).toBe('15 dias atrás');
  });

  it('retorna "1 mês atrás" para exatamente 1 mês', () => {
    const resultado = useContadorDeTempo('2025-06-10T12:00:00Z');
    expect(resultado).toBe('1 mês atrás');
  });

  it('retorna "N meses atrás" para menos de 12 meses', () => {
    const resultado = useContadorDeTempo('2025-02-10T12:00:00Z');
    expect(resultado).toBe('5 meses atrás');
  });

  it('retorna "1 ano atrás" para exatamente 12 meses', () => {
    const resultado = useContadorDeTempo('2024-07-10T12:00:00Z');
    expect(resultado).toBe('1 ano atrás');
  });

  it('retorna "N anos atrás" para mais de 1 ano', () => {
    const resultado = useContadorDeTempo('2022-07-10T12:00:00Z');
    expect(resultado).toBe('3 anos atrás');
  });
});
