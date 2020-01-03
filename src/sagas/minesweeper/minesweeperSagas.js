import { takeLeading, put, call } from 'redux-saga/effects';
import {
  MINESWEEPER_FETCH,
  actions as MineSweeperActions,
} from '../../reducers/minesweeper';
import { MineSweeperApis } from '../../apis';

export function* handleFetchMineSweeperBoard({ size, mines }) {
  try {
    const { res, error } = yield call(MineSweeperApis.fetchBoard, size, mines);
    if (error) throw error;

    console.log(res.data);
  } catch (error) {
    const msg = error.message || error;
    yield put(MineSweeperActions.fetchMineSweeperBoardFailed(msg));
  }
}

export default function* () {
  yield takeLeading(MINESWEEPER_FETCH, handleFetchMineSweeperBoard);
}
