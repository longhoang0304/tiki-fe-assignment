export const MINESWEEPER_FETCH = 'minesweeper/FETCH';
export const MINESWEEPER_FETCH_SUCCESS = 'minesweeper/FETCH_SUCCESS';
export const MINESWEEPER_FETCH_FAILED = 'minesweeper/FETCH_FAILED';

export const MINESWEEPER_OPEN = 'minesweeper/OPEN';

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

const openBox = (x, y) => ({
  type: MINESWEEPER_OPEN,
  x, y,
});

export const actions = {
  fetchMineSweeperBeginnerBoard,
  fetchMineSweeperAdvantageBoard,
  fetchMineSweeperBoardSuccess,
  fetchMineSweeperBoardFailed,
  openBox,
};

// =========================

const getBoard = ({ minesweeper }) => minesweeper.board;
const getBoardSize = ({ minesweeper }) => minesweeper.board.length;
const getBoxData = ({ minesweeper }, x, y) => minesweeper.board[x][y];
const isLoading = ({ minesweeper }) => minesweeper.isLoading;
const getGameStatus = ({ minesweeper }) => minesweeper.gameStatus;

export const selectors = {
  getBoard,
  getBoardSize,
  getBoxData,
  isLoading,
  getGameStatus,
};

const initialState = {
  isLoading: false,
  gameStatus: 0, // 1 = win, 2 = lose
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
        gameStatus: 0,
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

    case MINESWEEPER_OPEN: {
      const { x, y } = action;
      const { board } = state;
      const newBox = { ...board[x][y], isOpen: true };
      const newRow = [...board[x]];
      const newBoard = [...board];

      newRow[y] = newBox;
      newBoard[x] = newRow;

      return {
        ...state,
        board: newBoard,
      };
    }
    default: return state;
  }
}
