// src/components/render-categoria/categoriaUI.spec.tsx
import { itemMock1, itemMock2 } from '@/src/utils/mocks/itensMock';
import { MaterialIcons } from '@expo/vector-icons';
import { render } from '@testing-library/react-native';
import React from 'react';
import { CategoriasUI } from './index';    // ou './index' se você tiver um index.tsx que re-exporta

jest.mock('../tituloIcone', () => ({
    __esModule: true,
    default: jest.fn(() => null),
}));

jest.mock('../item-row', () => ({
    __esModule: true,
    ItemRow: jest.fn(() => null),
}));

const itemRowMock = require('../item-row').ItemRow as jest.Mock;

const categoria = {
    key: 'frutas',
    itens: [itemMock1, itemMock2],
    label: 'Frutas',
    icon: 'shopping-cart' as keyof typeof MaterialIcons.glyphMap,
    cor: '#FF0000',
};

afterEach(() => jest.clearAllMocks());

describe('CategoriasUI', () => {
    it('prioriza itensSelecionados para definir isChecked', () => {
        render(
            <CategoriasUI
                item={categoria}
                toggleSelecionado={jest.fn()}
                itensSelecionados={{ [itemMock1.id]: true }}
                handleDelete={jest.fn()}
            />,
        );

        const firstProps = itemRowMock.mock.calls[0][0];
        expect(firstProps.isChecked).toBe(true);
    });
});
