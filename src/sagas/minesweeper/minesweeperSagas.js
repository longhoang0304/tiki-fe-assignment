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
    yield put(MineSweeperActions.fetchMineSweeperBoardSuccess(board, mineMap));
  } catch (error) {
    const msg = error.message || error;
    yield put(MineSweeperActions.fetchMineSweeperBoardFailed(msg));
  }
}

/**
 *
 * @param board
 * @param ix
 * @param iy
 *
 * using BFS to search for all neighbor box to open them
 */
function findNeighbor(board, ix, iy) {
  const neighbor = {};
  const size = board[0].length;
  const q = [{ x: ix, y: iy }]; // create a queue
  while (q.length) {
    const currentNode = q.shift();
    const { x, y } = currentNode;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const xx = x - i;
        const yy = y - j;
        const key = `${xx}+${yy}`;

        if (xx < 0 || xx >= size) continue;
        if (yy < 0 || yy >= size) continue;
        if (board[xx][yy].isOpen || neighbor[key]) continue;


        neighbor[key] = { x: xx, y: yy };
        // found the box that contains a number or a mine
        // with this kind of box, we don't have to push this box to the queue
        if (board[xx][yy].data) {
          continue;
        }

        q.unshift({ x: xx, y: yy });
      }
    }
  }
  return Object.values(neighbor);
}

export function* handleToggleNeighbor({ box }) {
  if (box.data < 0) {
    yield put(MineSweeperActions.gameOver());
    return;
  }
  if (box.isOpen || box.data) return;

  const board = yield select(MineSweeperSelectors.getBoard);
  const { x, y } = box;

  const neighbors = findNeighbor(board, x, y);

  yield put(MineSweeperActions.openNeighbor(neighbors));
}

export default function* () {
  yield takeLeading(MINESWEEPER_FETCH, handleFetchMineSweeperBoard);
  yield takeEvery(MINESWEEPER_OPEN, handleToggleNeighbor);
}
