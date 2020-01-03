/* eslint-disable no-param-reassign */
import {
  takeLeading, takeEvery,
  put, call, select,
} from 'redux-saga/effects';
import {
  MINESWEEPER_FETCH,
  MINESWEEPER_OPEN,
  actions as MineSweeperActions,
  selectors as MineSweeperSelectors,
} from '../../reducers/minesweeper';
import { MineSweeperApis } from '../../apis';

function calculateMine(board, x, y, size) {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const xx = x - i;
      const yy = y - j;
      if (xx < 0 || xx >= size) continue;
      if (yy < 0 || yy >= size) continue;
      // this is a mind, don't count this :D
      if (board[xx][yy].data < 0) continue;
      board[xx][yy].data++;
    }
  }
  return board;
}

function genBoard(size, mineMap) {
  // init board
  const board = [...new Array(size)]
    .map(
      (_, x) => [...new Array(size)].map(
        (_, y) => ({
          x,
          y,
          data: 0,
          isOpen: false,
        }),
      ),
    );

  // put the mine on the board
  for (let i = 0; i < mineMap.length; i++) {
    const currentMine = mineMap[i];
    board[currentMine.x][currentMine.y].data = -1;
    calculateMine(board, currentMine.x, currentMine.y, size);
  }

  return board;
}

export function* handleFetchMineSweeperBoard({ size, mines }) {
  try {
    const { res, error } = yield call(MineSweeperApis.fetchBoard, size, mines);
    if (error) throw error;

    const { data: mineMap } = res.data;
    const board = genBoard(size, mineMap);
    yield put(MineSweeperActions.fetchMineSweeperBoardSuccess(board));
  } catch (error) {
    const msg = error.message || error;
    yield put(MineSweeperActions.fetchMineSweeperBoardFailed(msg));
  }
}

export function* handleToggleNeighbor({ box }) {
  if (box.isOpen || box.data) return;

  const board = yield select(MineSweeperSelectors.getBoard);
  const size = board[0].length;
  const { x, y } = box;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const xx = x - i;
      const yy = y - j;

      if (xx < 0 || xx >= size) continue;
      if (yy < 0 || yy >= size) continue;
      // this is a mind, don't count this :D
      if (board[xx][yy].isOpen) continue;
      yield put(MineSweeperActions.openBox(board[xx][yy]));
    }
  }
}

export default function* () {
  yield takeLeading(MINESWEEPER_FETCH, handleFetchMineSweeperBoard);
  // yield takeEvery(MINESWEEPER_OPEN, handleToggleNeighbor);
}
