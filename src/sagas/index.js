import { all } from 'redux-saga/effects';
import minesweeperSagas from './minesweeper';

export default function* () {
  yield all([
    minesweeperSagas(),
  ]);
}
