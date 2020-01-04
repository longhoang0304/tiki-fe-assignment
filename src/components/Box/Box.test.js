import React from 'react';
import { mount } from 'enzyme';
import Box from './Box';
import { BoxStyled } from './Box.styled';

describe('<Box />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const openBoxMock = jest.fn();

  const Component = mount(
    <Box
      openBox={openBoxMock}
      box={{
        x: 1,
        y: 1,
        data: 0,
        isOpen: false,
      }}
    />
    ,
  );

  it('should render', () => {
    expect(Component.length).toBe(1);
  });
  it('match snapshot', () => {
    expect(Component).toMatchSnapshot();
  });
  it('should call openBox when clicked', () => {
    const BoxStyledComp = Component.find(BoxStyled).at(0);
    BoxStyledComp.simulate('click');

    expect(openBoxMock).toBeCalledTimes(1);
  });
});
