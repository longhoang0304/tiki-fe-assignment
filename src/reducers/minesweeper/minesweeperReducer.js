export const MINESWEEPER_FETCH = 'minesweeper/FETCH';
export const MINESWEEPER_FETCH_SUCCESS = 'minesweeper/FETCH_SUCCESS';
export const MINESWEEPER_FETCH_FAILED = 'minesweeper/FETCH_FAILED';

const fetchMineSweeperBoard = (size, mines) => () => ({
  type: MINESWEEPER_FETCH,
  size,
  mines,
});

const fetchMineSweeperBeginnerBoard = fetchMineSweeperBoard(9, 10);
const fetchMineSweeperAdvantageBoard = fetchMineSweeperBoard(16, 40);

const fetchMineSweeperBoardSuccess = (board) => ({
  type: MINESWEEPER_FETCH_SUCCESS,
  board,
});

const fetchMineSweeperBoardFailed = (error) => ({
  type: MINESWEEPER_FETCH_FAILED,
  error,
});

export const actions = {
  fetchMineSweeperBeginnerBoard,
  fetchMineSweeperAdvantageBoard,
  fetchMineSweeperBoardSuccess,
  fetchMineSweeperBoardFailed,
};

// =========================

const getBoard = ({ minesweeper }) => minesweeper.board;

export const selectors = {
  getBoard,
};

const initialState = {
  isLoading: false,
  errorMsg: null,
  board: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MINESWEEPER_FETCH: {
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
        board: [],
      };
    }

    case MINESWEEPER_FETCH_SUCCESS: {
      const { board } = action;
      return {
        ...state,
        isLoading: false,
        board,
      };
    }

    case MINESWEEPER_FETCH_FAILED: {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        errorMsg: error,
      };
    }
    default: return state;
  }
}
