import { COLORS } from "@/src/utils/constants/Colors";
import { CategoriaRenderData } from "@/src/utils/types/components/componentsTypes";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { RefreshControl } from "react-native";
import CardItensLista from ".";

const mockUseCategorias = require("@/src/hooks/useCategorias")
  .useCategorias as jest.Mock;
const mockUseDeletarItem = require("@/src/hooks/itensLista/useDeletarItem")
  .useDeletarItem as jest.Mock;
const mockUseToggleItens = require("@/src/hooks/useToggleItens")
  .useToggleItens as jest.Mock;
const mockBuildItensComStatus = require("@/src/utils/helpers/lista")
  .buildItensComStatus as jest.Mock;
const CategoriasUIMock = require("../render-categoria")
  .CategoriasUI as jest.Mock;

jest.mock("@/src/hooks/useCategorias", () => ({
  useCategorias: jest.fn(),
}));
jest.mock("@/src/hooks/itensLista/useDeletarItem", () => ({
  useDeletarItem: jest.fn(),
}));
jest.mock("@/src/hooks/useToggleItens", () => ({
  useToggleItens: jest.fn(),
}));
jest.mock("@/src/utils/helpers/lista", () => ({
  buildItensComStatus: jest.fn(),
}));
jest.mock("../barra-de-porcentagem", () => ({
  __esModule: true,
  BarraDePorcentagem: jest.fn(() => null),
}));
jest.mock("../render-categoria", () => ({
  __esModule: true,
  CategoriasUI: jest.fn(() => null),
}));

describe("CardItensLista", () => {
  const listaId = "lista-123";
  const itensAgrupados = [{ id: "i1" }, { id: "i2" }] as any;
  const onRefreshMock = jest.fn();
  const mockMutate = jest.fn();
  const toggleSelecionado = jest.fn();
  const itensSelecionados = ["i1"];
  const categoriasStub = [
    { key: "c1", title: "Cat 1" },
    { key: "c2", title: "Cat 2" },
  ] as any;
  const statusStub = [{ key: "c1", percentual: 50 }];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCategorias.mockReturnValue(categoriasStub);
    mockUseDeletarItem.mockReturnValue({ deletarItem: mockMutate } as any);
    mockUseToggleItens.mockReturnValue({
      itensSelecionados,
      toggleSelecionado,
    });
    mockBuildItensComStatus.mockReturnValue(statusStub);
  });

  it("renderiza estado vazio quando não há categorias", () => {
    mockUseCategorias.mockReturnValue([]);

    const { getByText } = render(
      <CardItensLista
        listaId={listaId}
        itensAgrupados={itensAgrupados}
        refreshing={false}
        onRefresh={onRefreshMock}
      />
    );

    expect(
      getByText("Ainda não há itens na sua lista. Adicione novos itens.")
    ).toBeTruthy();
  });

  it("chama onRefresh ao puxar para atualizar", () => {
    const { UNSAFE_getByType } = render(
      <CardItensLista
        listaId={listaId}
        itensAgrupados={itensAgrupados}
        refreshing={false}
        onRefresh={onRefreshMock}
      />
    );

    const rc = UNSAFE_getByType(RefreshControl);
    fireEvent(rc, "refresh");

    expect(onRefreshMock).toHaveBeenCalled();
    expect(rc.props.colors).toEqual([COLORS.verde_principal]);
  });

  it("renderiza CategoriasUI para cada categoria", () => {
    render(
      <CardItensLista
        listaId={listaId}
        itensAgrupados={itensAgrupados}
        refreshing={false}
        onRefresh={onRefreshMock}
      />
    );

    expect(CategoriasUIMock).toHaveBeenCalledTimes(categoriasStub.length);

    categoriasStub.forEach((cat: CategoriaRenderData, idx: number) => {
      const props = CategoriasUIMock.mock.calls[idx][0];
      expect(props.item).toBe(cat);
      expect(props.itensSelecionados).toBe(itensSelecionados);
      expect(props.toggleSelecionado).toBe(toggleSelecionado);
      expect(typeof props.handleDelete).toBe("function");
    });
  });

  it("executa mutate ao chamar handleDelete", () => {
    render(
      <CardItensLista
        listaId={listaId}
        itensAgrupados={itensAgrupados}
        refreshing={false}
        onRefresh={onRefreshMock}
      />
    );

    const handleDelete = CategoriasUIMock.mock.calls[0][0].handleDelete;
    handleDelete("item-xyz");

    expect(mockMutate).toHaveBeenCalledWith("item-xyz");
  });
});
