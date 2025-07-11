import React from 'react'
import { render } from '@testing-library/react-native'
import { BarraDePorcentagem } from '@/src/components/barra-de-porcentagem'
import {
  itemMock1,
  itemMock2,
  itemMock3,
  itemMock4,
} from '@/src/utils/mocks/itensMock'

describe('BarraDePorcentagem', () => {
  it('mostra “Nenhum item comprado” quando todos estão pendentes', () => {
    const { getByText } = render(
      <BarraDePorcentagem itens={[itemMock1, itemMock2]} />,
    )
    expect(getByText('Nenhum item comprado')).toBeTruthy()
  })

  it('mostra contagem correta de itens comprados', () => {
    const comprado = { ...itemMock3, comprado: true }
    const { getByText } = render(
      <BarraDePorcentagem itens={[itemMock3, comprado]} />,
    )
    expect(getByText('1 de 2 itens comprados')).toBeTruthy()
  })

  it('mostra “Lista completa” quando todos comprados', () => {
    const lista = [
      { ...itemMock1, comprado: true },
      { ...itemMock2, comprado: true },
      { ...itemMock4, comprado: true },
    ]
    const { getByText } = render(<BarraDePorcentagem itens={lista} />)
    expect(getByText('Lista completa')).toBeTruthy()
  })
})
