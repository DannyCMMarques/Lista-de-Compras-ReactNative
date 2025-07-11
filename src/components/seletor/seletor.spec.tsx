import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Seletor from '.';

const ICON_OPTIONS = ['shopping-cart', 'cake', 'flight'];
const ICON_DESC_OPTIONS = [
    { value: 'frutas', icon: 'apple', label: 'Frutas' },
    { value: 'limpeza', icon: 'cleaning-services', label: 'Limpeza' },
];
const COLOR_OPTIONS = ['#ff0000', '#00ff00', '#0000ff'];

function flattenStyle(styleProp: any) {
    return Array.isArray(styleProp)
        ? Object.assign({}, ...styleProp)
        : styleProp;
}

describe('Seletor', () => {
    it('renderiza o título quando passado via props', () => {
        const onSelect = jest.fn();
        const { getByText } = render(
            <Seletor
                title="Minha Lista"
                type="icon"
                options={ICON_OPTIONS}
                selected={null}
                onSelect={onSelect}
            />
        );
        expect(getByText('Minha Lista')).toBeTruthy();
    });

    it('renderiza a quantidade correta de opções (type="icon")', () => {
        const onSelect = jest.fn();
        const { UNSAFE_getAllByType } = render(
            <Seletor
                type="icon"
                options={ICON_OPTIONS}
                selected={null}
                onSelect={onSelect}
            />
        );
        const items = UNSAFE_getAllByType(TouchableOpacity);
        expect(items).toHaveLength(ICON_OPTIONS.length);
    });

    it('dispara onSelect com o valor correto ao pressionar um ícone (type="icon")', () => {
        const onSelect = jest.fn();
        const { UNSAFE_getAllByType } = render(
            <Seletor
                type="icon"
                options={ICON_OPTIONS}
                selected={null}
                onSelect={onSelect}
            />
        );
        const items = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(items[1]);
        expect(onSelect).toHaveBeenCalledWith(ICON_OPTIONS[1]);
    });

    it('aplica estilo de selecionado para type !== "color"', () => {
        const onSelect = jest.fn();
        const selectedValue = 'limpeza';
        const { UNSAFE_getAllByType } = render(
            <Seletor
                type="iconComDescricao"
                options={ICON_DESC_OPTIONS}
                selected={selectedValue}
                onSelect={onSelect}
            />
        );
        const items = UNSAFE_getAllByType(TouchableOpacity);
        const selectedBtn = items.find(btn => {
            const style = flattenStyle(btn.props.style);
            return style.borderColor === '#10b981';
        })!;
        const style = flattenStyle(selectedBtn.props.style);
        expect(style.backgroundColor).toBe('#d1fae5');
        expect(style.borderWidth).toBe(2);
    });

    describe('quando type="color"', () => {
        it('renderiza todos os itens de cor', () => {
            const onSelect = jest.fn();
            const { UNSAFE_getAllByType } = render(
                <Seletor
                    type="color"
                    options={COLOR_OPTIONS}
                    selected={null}
                    onSelect={onSelect}
                />
            );
            const items = UNSAFE_getAllByType(TouchableOpacity);
            expect(items).toHaveLength(COLOR_OPTIONS.length);
        });

        it('mostra ícone de check apenas no item selecionado', () => {
            const onSelect = jest.fn();
            const selectedColor = COLOR_OPTIONS[2];
            const { UNSAFE_getAllByType } = render(
                <Seletor
                    type="color"
                    options={COLOR_OPTIONS}
                    selected={selectedColor}
                    onSelect={onSelect}
                />
            );
            const icons = UNSAFE_getAllByType(MaterialIcons);
            const checks = icons.filter(ic => ic.props.name === 'check');
            expect(checks).toHaveLength(1);

            const parentStyle = flattenStyle(checks[0].parent.props.style);
            expect(parentStyle.backgroundColor).toContain(selectedColor);
        });

        it('dispara onSelect com a cor correta ao pressionar (type="color")', () => {
            const onSelect = jest.fn();
            const { UNSAFE_getAllByType } = render(
                <Seletor
                    type="color"
                    options={COLOR_OPTIONS}
                    selected={null}
                    onSelect={onSelect}
                />
            );
            const items = UNSAFE_getAllByType(TouchableOpacity);
            fireEvent.press(items[0]);
            expect(onSelect).toHaveBeenCalledWith(COLOR_OPTIONS[0]);
        });
    });

    it('exibe o rótulo quando type="iconComDescricao"', () => {
        const onSelect = jest.fn();
        const { getByText } = render(
            <Seletor
                type="iconComDescricao"
                options={ICON_DESC_OPTIONS}
                selected={null}
                onSelect={onSelect}
            />
        );
        expect(getByText('Frutas')).toBeTruthy();
        expect(getByText('Limpeza')).toBeTruthy();
    });
});
