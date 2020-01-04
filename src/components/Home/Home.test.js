import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Home from './Home';


describe('<Home />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const resetBoardMock = jest.fn();

  const Component = mount(
    <Router>
      <Home
        resetBoard={resetBoardMock}
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
  it('should render 2 Link', () => {
    const LinkComp = Component.find(Link);
    expect(LinkComp.length).toBe(2);
  });
  it('should call fetchBoardMock once', () => {
    // trigger useEffect
    act(() => {
      mount(
        <Router>
          <Home
            resetBoard={resetBoardMock}
          />
        </Router>
        ,
      );
    });
    expect(resetBoardMock).toBeCalledTimes(1);
  });
});
