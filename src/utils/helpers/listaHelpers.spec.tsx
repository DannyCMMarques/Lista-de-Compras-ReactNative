import { mapItensParaCategorias, buildItensComStatus } from '@/src/utils/helpers/lista'
import {
  itemMock1,
  itemMock2,
  itemMock3,
  itemMock5,
} from '@/src/utils/mocks/itensMock'
import { mockListaAgrupadaPorCategoria } from '@/src/utils/mocks/listasMock'

describe('mapItensParaCategorias', () => {
  it('retorna array vazio quando itensAgrupados é undefined', () => {
    expect(mapItensParaCategorias()).toEqual([])
  })

  it('mapeia categorias corretamente', () => {
    const resultado = mapItensParaCategorias(
      mockListaAgrupadaPorCategoria.itensAgrupados,
    )
    expect(resultado).toHaveLength(
      Object.keys(mockListaAgrupadaPorCategoria.itensAgrupados).length,
    )
    const frutas = resultado.find((c) => c.key === 'frutas')
    expect(frutas).toMatchObject({
      key: 'frutas',
      label: 'Frutas',
      icon: 'apple',
      cor: expect.any(String),
      itens: [itemMock1, itemMock2],
    })
  })

  it('usa valores padrão para categoria desconhecida', () => {
    const [resultado] = mapItensParaCategorias({ inédita: [itemMock1] })
    expect(resultado).toMatchObject({
      key: 'inédita',
      label: 'inédita',
      icon: 'category',
      cor: '#10b981',
    })
  })
})

describe('buildItensComStatus', () => {
  const categorias = mapItensParaCategorias(
    mockListaAgrupadaPorCategoria.itensAgrupados,
  )

  it('mantém status original quando itensSelecionados está vazio', () => {
    const resultado = buildItensComStatus(categorias, {})
    expect(
      resultado.find((i) => i.id === itemMock1.id)?.comprado,
    ).toBe(false)
    expect(
      resultado.find((i) => i.id === itemMock5.id)?.comprado,
    ).toBe(true)
  })

  it('sobrepõe status de itens presentes em itensSelecionados', () => {
    const novoStatus = {
      [itemMock1.id]: true,
      [itemMock5.id]: false,
    }
    const resultado = buildItensComStatus(categorias, novoStatus)
    expect(
      resultado.find((i) => i.id === itemMock1.id)?.comprado,
    ).toBe(true)
    expect(
      resultado.find((i) => i.id === itemMock5.id)?.comprado,
    ).toBe(false)
    expect(
      resultado.find((i) => i.id === itemMock3.id)?.comprado,
    ).toBe(itemMock3.comprado)
  })
})
