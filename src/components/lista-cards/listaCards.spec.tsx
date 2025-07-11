import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Pressable } from 'react-native'

import { mockListas } from '@/src/utils/mocks/listasMock'
import { ListaCards } from '.'

const mockPush = jest.fn()
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('@/src/hooks/useContadorDeTempo', () => ({
  useContadorDeTempo: () => 'Hoje',
}))

const mockMutate = jest.fn()
jest.mock('@/src/hooks/useListas', () => ({
  useDeletarLista: () => ({ mutate: mockMutate }),
}))

jest.mock('@/src/hooks/useShareLista', () => ({
  useShareLista: () => jest.fn(),
}))
jest.mock('@/src/hooks/useShareListaCompleta', () => ({
  useShareListaCompleta: () => jest.fn(),
}))

jest.mock('../tituloIcone', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}))
jest.mock('../barra-de-porcentagem', () => ({
  __esModule: true,
  BarraDePorcentagem: jest.fn(() => null),
}))

const TituloMock = require('../tituloIcone').default as jest.Mock

afterEach(() => jest.clearAllMocks())

describe('ListaCards', () => {
  const lista = mockListas[0]

it('envia props corretas para TituloComIcone', () => {
  render(<ListaCards lista={lista} />)

  expect(TituloMock.mock.calls[0][0]).toMatchObject({
    titulo:      lista.titulo,
    iconName:    lista.iconeEscolhido,
    color:       lista.corEscolhida,
    onShareDeepLink: expect.any(Function),
    onShare:         expect.any(Function),
    onDelete:        expect.any(Function),
  })
})
  it('navega quando Pressable é pressionado', () => {
    const { UNSAFE_getByType } = render(<ListaCards lista={lista} />)
    fireEvent.press(UNSAFE_getByType(Pressable))

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/lista/[id]',
      params: { id: lista.id },
    })
  })

  it('chama mutate ao executar onDelete', () => {
    render(<ListaCards lista={lista} />)

    const onDelete = TituloMock.mock.calls[0][0].onDelete as () => void
    onDelete()

    expect(mockMutate).toHaveBeenCalledWith(lista.id)
  })
})
