import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Checkbox from 'expo-checkbox';
import { TouchableOpacity, Text } from 'react-native';


import { COLORS } from '@/src/utils/constants/Colors';
import { ItensListaResponse } from '@/src/utils/types/interfaces/ItemListaInterface';
import { ItemRow } from '.';

describe('ItemRow', () => {
  const item: ItensListaResponse = {
    id: 'item-1',
    nome: 'Maçã',
    quantidade: 2,
    categoria: 'frutas',
    unidade: 'kg',
    comprado: false,
    createdAt: new Date(),
  };

  it('renderiza nome e quantidade/unidade corretamente', () => {
    const { getByText } = render(
      <ItemRow
        item={item}
        isChecked={false}
        onToggle={() => {}}
        handleDelete={() => {}}
      />
    );
    expect(getByText('Maçã')).toBeTruthy();
    expect(getByText('2 kg')).toBeTruthy();
  });

  it('checkbox reflete estado isChecked=false e cor padrão', () => {
    const { UNSAFE_getByType } = render(
      <ItemRow
        item={item}
        isChecked={false}
        onToggle={() => {}}
        handleDelete={() => {}}
      />
    );
    const checkbox = UNSAFE_getByType(Checkbox);
    expect(checkbox.props.value).toBe(false);
    expect(checkbox.props.color).toBe(COLORS.verde_principal);
  });

  it('checkbox reflete estado isChecked=true e cor correta', () => {
    const { UNSAFE_getByType } = render(
      <ItemRow
        item={item}
        isChecked={true}
        onToggle={() => {}}
        handleDelete={() => {}}
      />
    );
    const checkbox = UNSAFE_getByType(Checkbox);
    expect(checkbox.props.value).toBe(true);
    expect(checkbox.props.color).toBe('#10B98166');
  });

  it('chama onToggle com (id, isChecked) ao mudar valor do checkbox', () => {
    const onToggle = jest.fn();
    const { UNSAFE_getByType } = render(
      <ItemRow
        item={item}
        isChecked={false}
        onToggle={onToggle}
        handleDelete={() => {}}
      />
    );
    const checkbox = UNSAFE_getByType(Checkbox);
    fireEvent(checkbox, 'valueChange');
    expect(onToggle).toHaveBeenCalledWith(item.id, false);
  });

  it('chama handleDelete com id ao pressionar o botão de delete', () => {
    const handleDelete = jest.fn();
    const { UNSAFE_getAllByType } = render(
      <ItemRow
        item={item}
        isChecked={false}
        onToggle={() => {}}
        handleDelete={handleDelete}
      />
    );
    const buttons = UNSAFE_getAllByType(TouchableOpacity);
    expect(buttons).toHaveLength(1);
    fireEvent.press(buttons[0]);
    expect(handleDelete).toHaveBeenCalledWith(item.id);
  });

  it('exibe o nome riscado quando isChecked=true', () => {
    const { getByText } = render(
      <ItemRow
        item={item}
        isChecked={true}
        onToggle={() => {}}
        handleDelete={() => {}}
      />
    );
    const nameText = getByText('Maçã');
    const stylesArray = Array.isArray(nameText.props.style)
      ? nameText.props.style
      : [nameText.props.style];
    expect(stylesArray.length).toBeGreaterThan(1);
  });

  it('desativa estilo de quantidade quando isChecked=true', () => {
    const { getByText } = render(
      <ItemRow
        item={item}
        isChecked={true}
        onToggle={() => {}}
        handleDelete={() => {}}
      />
    );
    const qtyText = getByText('2 kg');
    const stylesArray = Array.isArray(qtyText.props.style)
      ? qtyText.props.style
      : [qtyText.props.style];
    expect(stylesArray.length).toBeGreaterThan(1);
  });
});
