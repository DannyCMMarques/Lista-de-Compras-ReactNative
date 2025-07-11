import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { Toast } from 'toastify-react-native';
import { useAdicionarItem } from '@/src/hooks/useItensLista';
import { useHandleVoltar } from '@/src/hooks/useHandleVoltar';
import FormularioItens from '@/src/app/adicionar-itens/index';



jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: 'lista-1' }),
}));

jest.mock('@/src/hooks/useItensLista', () => ({
  useAdicionarItem: jest.fn(),
}));

jest.mock('@/src/hooks/useHandleVoltar', () => ({
  useHandleVoltar: jest.fn(),
}));

jest.mock('react-hook-form', () => {
  const actual = jest.requireActual('react-hook-form');
  return {
    ...actual,
    useForm: () => ({
      control: {},
      formState: { errors: {} },
      handleSubmit:
        (cb: (data: any) => void) =>
          () =>
            cb({ nome: 'Maçã', quantidade: 1, unidade: 'unidade' }),
    }),
  };
});

jest.mock('@/src/components/modal', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('@/src/components/input-field', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('@/src/components/select-field', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('@/src/components/seletor', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('@/src/components/tituloIcone', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('@/src/components/botao', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: ({
      onPress,
      texto,
    }: {
      onPress: () => void;
      texto: string;
    }) => (
      <Text testID={`btn-${texto}`} onPress={onPress}>
        {texto}
      </Text>
    ),
  };
});

jest.mock('toastify-react-native', () => ({
  Toast: { success: jest.fn() },
}));
jest.mock('toastify-react-native/components/ToastManager', () => ({
  __esModule: true,
  default: () => null,
}));

const mutateMock = jest.fn();
(useAdicionarItem as jest.Mock).mockReturnValue({ mutate: mutateMock });

const voltarMock = jest.fn();
(useHandleVoltar as jest.Mock).mockReturnValue(voltarMock);

afterEach(() => {
  jest.clearAllMocks();
});


describe('FormularioItens', () => {
  it('envia dados válidos, mostra toast e volta', async () => {
    const { getByTestId } = render(<FormularioItens />);

    fireEvent.press(getByTestId('btn-Adicionar Item'));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        nome: 'Maçã',
        quantidade: 1,
        unidade: 'unidade',
        categoria: 'outros',
      });
      expect(Toast.success).toHaveBeenCalledWith('Item criado com sucesso!');
      expect(voltarMock).toHaveBeenCalled();
    });
  });
});
