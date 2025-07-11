// __tests__/SelectField.test.tsx
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Picker } from '@react-native-picker/picker';
import { Text } from 'react-native';
import { useForm, FieldError } from 'react-hook-form';

import { unidadeOptions } from '@/src/utils/content/unidadeOptions';
import SelectField from '.';

type FormValues = {
  unidade: string;
};

describe('SelectField', () => {
  function FormWrapper(props: { error?: FieldError }) {
    const { control, watch } = useForm<FormValues>({
      defaultValues: { unidade: '' },
    });

    return (
      <>
        <SelectField
          name="unidade"
          control={control}
          error={props.error}
          options={unidadeOptions}
        />
        <Text testID="output">{watch('unidade')}</Text>
      </>
    );
  }

  it('exibe mensagem de erro quando a prop error é passada', () => {
    const error: FieldError = {
      type: 'manual',
      message: 'Campo obrigatório',
    };

    const { getByText } = render(<FormWrapper error={error} />);
    expect(getByText('Campo obrigatório')).toBeTruthy();
  });

  it('atualiza o valor do formulário ao selecionar uma opção', () => {
    const { getByTestId, UNSAFE_getByType } = render(<FormWrapper />);
    const picker = UNSAFE_getByType(Picker);

    // valor inicial
    expect(getByTestId('output').props.children).toBe('');

    // simula seleção de "kg"
    act(() => {
      fireEvent(picker, 'valueChange', 'kg');
    });

    // agora o watch reflete "kg"
    expect(getByTestId('output').props.children).toBe('kg');
  });
});
