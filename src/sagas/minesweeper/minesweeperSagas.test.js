/* eslint-disable no-param-reassign */
import {
  put, call, select,
} from 'redux-saga/effects';
import {
  actions as MineSweeperActions,
  selectors as MineSweeperSelectors,
} from '../../reducers/minesweeper';
import { handleToggleNeighbor, handleFetchMineSweeperBoard, genBoard } from './minesweeperSagas';
import { MineSweeperApis } from '../../apis';

describe('test handleToggleNeighbor 1', () => {
  const action = {
    box: {
      x: 0,
      y: 0,
      data: -1,
      isOpen: false,
    },
  };
  const iter = handleToggleNeighbor(action);

  it('should dispatch game over action', () => {
    expect(iter.next().value).toEqual(put(MineSweeperActions.gameOver()));
  });
  it('should end iterator', () => {
    expect(iter.next().done).toBe(true);
  });
});

describe('test handleToggleNeighbor 2', () => {
  const action = {
    box: {
      x: 0,
      y: 0,
      data: 1,
      isOpen: 1,
    },
  };
  const iter = handleToggleNeighbor(action);

  it('should end iterator', () => {
    expect(iter.next().done).toBe(true);
  });
});

describe('test handleToggleNeighbor 3', () => {
  const action = {
    box: {
      x: 0,
      y: 0,
      data: 0,
      isOpen: 0,
    },
  };
  const board = [
    [
      {
        x: 0,
        y: 0,
        data: 0,
        isOpen: 0,
      },
      {
        x: 0,
        y: 1,
        data: 1,
        isOpen: 0,
      },
    ],
    [
      {
        x: 1,
        y: 0,
        data: 1,
        isOpen: 0,
      },
      {
        x: 1,
        y: 1,
        data: 0,
        isOpen: 0,
      },
    ],
  ];
  const neighbor = [
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 0 },
  ];
  const iter = handleToggleNeighbor(action);

  it('should select the board from state', () => {
    expect(iter.next().value).toEqual(select(MineSweeperSelectors.getBoard));
  });
  it('should dispatch open neighbor action', () => {
    expect(iter.next(board).value).toEqual(put(MineSweeperActions.openNeighbor(neighbor)));
  });
  it('should end iterator', () => {
    expect(iter.next().done).toBe(true);
  });
});

describe('test handleFetchMineSweeperBoard 1', () => {
  const action = {
    size: 9,
    mines: 10,
  };
  const mineMap = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 2 },
    { x: 3, y: 3 },
    { x: 3, y: 4 },
    { x: 7, y: 2 },
    { x: 1, y: 8 },
    { x: 8, y: 4 },
    { x: 1, y: 1 },
    { x: 6, y: 5 },
  ];
  const res = {
    res: {
      data: {
        data: mineMap,
      },
    },
  };
  const board = genBoard(action.size, mineMap);
  const iter = handleFetchMineSweeperBoard(action);

  it('should call for the API', () => {
    expect(iter.next().value).toEqual(call(MineSweeperApis.fetchBoard, action.size, action.mines));
  });
  it('should save the board', () => {
    expect(iter.next(res).value).toEqual(put(MineSweeperActions.fetchMineSweeperBoardSuccess(board, mineMap)));
  });
  it('should end iterator', () => {
    expect(iter.next().done).toBe(true);
  });
});
