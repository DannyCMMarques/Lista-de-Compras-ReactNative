import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { CORES_LISTA } from '@/src/utils/content/coresListas';
import { Toast } from 'toastify-react-native';
import { useCriarLista } from '@/src/hooks/useListas';
import { useHandleVoltar } from '@/src/hooks/useHandleVoltar';
import FormularioListas from '@/src/app/adicionar-listas/index';


jest.mock('@/src/hooks/useListas', () => ({
    useCriarLista: jest.fn(),
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
                        cb({ titulo: 'Minha lista' }),
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
jest.mock('@/src/components/seletor', () => ({
    __esModule: true,
    default: () => null,
}));
jest.mock('@/src/components/ui/tituloIcone', () => ({
    __esModule: true,
    default: () => null,
}));
jest.mock('@/src/components/botao', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return {
        __esModule: true,
        default: ({
            texto,
            onPress,
        }: {
            texto: string;
            onPress: () => void;
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
(useCriarLista as jest.Mock).mockReturnValue({ mutate: mutateMock });

const voltarMock = jest.fn();
(useHandleVoltar as jest.Mock).mockReturnValue(voltarMock);


afterEach(() => {
    jest.clearAllMocks();
});

describe('FormularioListas', () => {
    it('envia payload correto, mostra toast e volta', async () => {
        const { getByTestId } = render(<FormularioListas />);

        fireEvent.press(getByTestId('btn-Criar Lista'));

        await waitFor(() => {
            expect(mutateMock).toHaveBeenCalledWith({
                titulo: 'Minha lista',
                corEscolhida: CORES_LISTA[0],
                iconeEscolhido: 'shopping-cart',
            });
            expect(Toast.success).toHaveBeenCalledWith('Lista criada com sucesso!');
            expect(voltarMock).toHaveBeenCalled();
        });
    });
});
