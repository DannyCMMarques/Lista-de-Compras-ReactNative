import { ItensListaResponse } from "../types/interfaces/ItemListaInterface";

export const itemMock1: ItensListaResponse = {
  id: 'item-1',
  nome: 'Maçã',
  quantidade: 2,
  categoria: 'frutas',
  unidade: 'kg',
  comprado: false,
  createdAt: new Date('2025-07-01T12:00:00Z'),
};

export const itemMock2: ItensListaResponse = {
  id: 'item-2',
  nome: 'Banana',
  quantidade: 12,
  categoria: 'frutas',
  unidade: 'un',
  comprado: false,
  createdAt: new Date('2025-07-01T12:05:00Z'),
};

export const itemMock3: ItensListaResponse = {
  id: 'item-3',
  nome: 'Detergente',
  quantidade: 3,
  categoria: 'limpeza',
  unidade: 'un',
  comprado: false,
  createdAt: new Date('2025-07-01T12:10:00Z'),
};

export const itemMock4: ItensListaResponse = {
  id: 'item-4',
  nome: 'Picanha',
  quantidade: 3,
  categoria: 'carnes',
  unidade: 'kg',
  comprado: false,
  createdAt: new Date('2025-07-08T15:30:00Z'),
};

export const itemMock5: ItensListaResponse = {
  id: 'item-6',
  nome: 'Carvão',
  quantidade: 1,
  categoria: 'outros',
  unidade: 'kg',
  comprado: true,
  createdAt: new Date('2025-07-08T15:40:00Z'),
};