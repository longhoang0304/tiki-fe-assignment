import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import Row from './Row';
import Box from '../Box';

const { store } = configureStore();

describe('<Row />', () => {
  const Component = mount(
    <Provider store={store}>
      <Row
        row={[
          {
            x: 0,
            y: 0,
            data: 0,
            isOpen: false,
          },
          {
            x: 0,
            y: 1,
            data: 0,
            isOpen: false,
          },
          {
            x: 0,
            y: 2,
            data: 0,
            isOpen: false,
          },
          {
            x: 0,
            y: 3,
            data: 0,
            isOpen: false,
          },
        ]}
      />
    </Provider>
    ,
  );

  it('should render', () => {
    expect(Component.length).toBe(1);
  });
  it('match snapshot', () => {
    expect(Component).toMatchSnapshot();
  });
  it('should render 4 boxes', () => {
    const BoxList = Component.find(Box);
    expect(BoxList.length).toBe(4);
  });
});
