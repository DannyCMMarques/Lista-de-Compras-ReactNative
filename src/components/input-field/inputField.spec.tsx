import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { useForm, FieldError } from 'react-hook-form';
import InputField from '.';


type FormValues = {
  testInput: string | number;
};

describe('InputField', () => {
  const placeholder = 'Digite algo...';

  function FormWrapper(props: {
    error?: FieldError;
    parse?: (value: string) => any;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  }) {
    const { control, watch } = useForm<FormValues>({
      defaultValues: { testInput: '' },
    });

    return (
      <>
        <InputField
          name="testInput"
          placeholder={placeholder}
          control={control}
          error={props.error}
          parse={props.parse}
          keyboardType={props.keyboardType}
        />
        <Text testID="output">{watch('testInput')}</Text>
      </>
    );
  }

  it('renderiza o placeholder corretamente', () => {
    const { getByPlaceholderText } = render(<FormWrapper />);
    expect(getByPlaceholderText(placeholder)).toBeTruthy();
  });

  it('exibe mensagem de erro quando a prop error é passada', () => {
    const error: FieldError = {
      type: 'manual',         
      message: 'Campo inválido',
    };
    const { getByText } = render(<FormWrapper error={error} />);
    expect(getByText('Campo inválido')).toBeTruthy();
  });

  it('atualiza o valor do formulário ao digitar no TextInput', () => {
    const { getByPlaceholderText, getByTestId } = render(<FormWrapper />);
    const input = getByPlaceholderText(placeholder);

    fireEvent.changeText(input, 'Olá Mundo');
    expect(getByTestId('output').props.children).toBe('Olá Mundo');
  });

  it('aplica a função parse antes de atualizar o valor', () => {
    const parse = (text: string) => parseInt(text, 10);
    const { getByPlaceholderText, getByTestId } = render(
      <FormWrapper parse={parse} />
    );
    const input = getByPlaceholderText(placeholder);

    fireEvent.changeText(input, '123');
    expect(getByTestId('output').props.children).toBe(123);
  });

  it('usa o keyboardType correto', () => {
    const { getByPlaceholderText } = render(
      <FormWrapper keyboardType="numeric" />
    );
    const input = getByPlaceholderText(placeholder);
    expect((input as any).props.keyboardType).toBe('numeric');
  });
});
