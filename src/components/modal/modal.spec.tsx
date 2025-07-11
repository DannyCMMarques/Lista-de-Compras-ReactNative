import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from '.';


jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe('Modal', () => {
  const mockBack = jest.fn();
  const insets = { bottom: 16 };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
    (useSafeAreaInsets as jest.Mock).mockReturnValue(insets);
    jest.clearAllMocks();
  });

  function flattenStyle(styleProp: any) {
    return Array.isArray(styleProp)
      ? Object.assign({}, ...styleProp)
      : styleProp;
  }

  it('renderiza título (string) e children', () => {
    const { getByText } = render(
      <Modal title="Meu Título">
        <Text>Conteúdo</Text>
      </Modal>
    );
    expect(getByText('Meu Título')).toBeTruthy();
    expect(getByText('Conteúdo')).toBeTruthy();
  });

  it('renderiza título customizado (ReactNode)', () => {
    const { getByText } = render(
      <Modal title={<Text>Customizado</Text>}>
        <Text>Child</Text>
      </Modal>
    );
    expect(getByText('Customizado')).toBeTruthy();
  });

  it('chama router.back ao pressionar o ícone de voltar', () => {
    const { UNSAFE_getByType } = render(
      <Modal title="T">X</Modal>
    );
    const backButton = UNSAFE_getByType(TouchableOpacity);
    fireEvent.press(backButton);
    expect(mockBack).toHaveBeenCalled();
  });

  it('aplica safe area insets nas views de modal e conteúdo', () => {
    const { UNSAFE_getAllByType } = render(
      <Modal title="T">
        <Text>Y</Text>
      </Modal>
    );
    const allViews = UNSAFE_getAllByType(View);
    const outerView = allViews[0];

    const outerStyle = flattenStyle(outerView.props.style);
    expect(outerStyle.marginBottom).toBe(insets.bottom);

  });
});
