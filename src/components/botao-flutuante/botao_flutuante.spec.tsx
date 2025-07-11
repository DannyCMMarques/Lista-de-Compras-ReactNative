import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BotaoFlutuante from '.';

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    MaterialIcons: (props: any) => <React.Fragment>{props.name}</React.Fragment>,
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));


describe('BotaoFlutuante', () => {
  const insets = { bottom: 20, top: 0, left: 0, right: 0 };
  const onPressMock = jest.fn();

  beforeEach(() => {
    (useSafeAreaInsets as jest.Mock).mockReturnValue(insets);
    jest.clearAllMocks();
  });

  function flattenStyle(styleProp: any) {
    return Array.isArray(styleProp)
      ? Object.assign({}, ...styleProp)
      : styleProp;
  }

  it('chama onPress ao ser pressionado', () => {
    const { UNSAFE_getByType } = render(
      <BotaoFlutuante onPress={onPressMock} />
    );
    const button = UNSAFE_getByType(TouchableOpacity);
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('aplica bottom = insets.bottom + 16', () => {
    const { UNSAFE_getByType } = render(
      <BotaoFlutuante onPress={onPressMock} />
    );
    const button = UNSAFE_getByType(TouchableOpacity);
    const style = flattenStyle(button.props.style);
    expect(style.bottom).toBe(insets.bottom + 16);
  });


});
