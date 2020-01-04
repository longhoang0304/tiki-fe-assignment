import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Modal from './Modal';
import { RestartBtn } from './Modal.styled';


describe('<Modal />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const fetchBoardMock = jest.fn();

  const Component = mount(
    <Router>
      <Modal
        isOpen
        duration="00:00:00"
        gameStatus={2}
        fetchBoard={fetchBoardMock}
      />
    </Router>
    ,
  );

  it('should render', () => {
    expect(Component.length).toBe(1);
  });
  it('match snapshot', () => {
    expect(Component).toMatchSnapshot();
  });
  it('should trigger fetchBoardMock when Restart button is clicked', () => {
    const RestartBtnComp = Component.find(RestartBtn).at(0);
    RestartBtnComp.simulate('click');
    expect(fetchBoardMock).toBeCalledTimes(1);
  });
});
