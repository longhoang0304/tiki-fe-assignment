import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Board from './Board';
import { RestartBtn } from './Board.styled';
import Row from '../Row';

describe('<Board />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const fetchBoardMock = jest.fn();

  const Component = mount(
    <Router>
      <Board
        fetchBoard={fetchBoardMock}
        board={[[], [], [], []]}
        isLoading={false}
        errorMsg={null}
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
  it('should render 4 rows', () => {
    const RestartBtnComp = Component.find(RestartBtn).at(0);
    RestartBtnComp.simulate('click');
    expect(fetchBoardMock).toBeCalledTimes(1);
  });
  it('should call fetchBoardMock once', () => {
    // trigger useEffect
    act(() => {
      mount(
        <Router>
          <Board
            fetchBoard={fetchBoardMock}
            board={[]}
            isLoading={false}
            errorMsg={null}
          />
        </Router>
        ,
      );
    });
    expect(fetchBoardMock).toBeCalledTimes(1);
  });
  it('should trigger fetchBoardMock when Restart button is clicked', () => {
    const RowList = Component.find(Row);
    expect(RowList.length).toBe(4);
  });
});
