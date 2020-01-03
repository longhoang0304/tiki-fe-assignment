import moment from 'moment';

export const MINESWEEPER_FETCH = 'minesweeper/FETCH';
export const MINESWEEPER_FETCH_SUCCESS = 'minesweeper/FETCH_SUCCESS';
export const MINESWEEPER_FETCH_FAILED = 'minesweeper/FETCH_FAILED';

export const MINESWEEPER_OPEN = 'minesweeper/OPEN';
export const MINESWEEPER_RESET = 'minesweeper/RESET';

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

const openBox = (box) => ({
  type: MINESWEEPER_OPEN,
  box,
});

const resetBoard = () => ({
  type: MINESWEEPER_RESET,
});

export const actions = {
  fetchMineSweeperBeginnerBoard,
  fetchMineSweeperAdvantageBoard,
  fetchMineSweeperBoardSuccess,
  fetchMineSweeperBoardFailed,
  openBox,
  resetBoard,
};

// =========================

const getBoard = ({ minesweeper }) => minesweeper.board;
const getBoardSize = ({ minesweeper }) => minesweeper.board.length;
const getBoxData = ({ minesweeper }, x, y) => minesweeper.board[x][y];
const isLoading = ({ minesweeper }) => minesweeper.isLoading;
const getGameStatus = ({ minesweeper }) => minesweeper.gameStatus;
const getTimer = ({ minesweeper }) => minesweeper.timer;

export const selectors = {
  getBoard,
  getBoardSize,
  getBoxData,
  isLoading,
  getGameStatus,
  getTimer,
};

const initialState = {
  isLoading: false,
  gameStatus: 0, // 0 = not started, 1 = start, 2 = win, 3 = lose
  errorMsg: null,
  board: [],
  timer: 0,
  availableBoxes: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MINESWEEPER_RESET: return initialState;

    case MINESWEEPER_FETCH: {
      const { size, mines } = action;
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
        gameStatus: 0,
        board: [],
        timer: 0,
        openedBox: 0,
        availableBoxes: size * size - mines,
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
      const { box } = action;
      if (box.isOpen) return state;

      if (box.data < 0) {
        return {
          ...state,
          gameStatus: 3,
        };
      }

      const { x, y } = box;
      const { board, gameStatus, availableBoxes } = state;

      // game over, user can't no longer interact with the game
      if (gameStatus > 1) return state;

      // available boxes to open
      // availableBoxes = 0 -> wins
      if (!(availableBoxes - 1)) {
        return {
          ...state,
          gameStatus: 2,
          availableBoxes: 0,
        };
      }

      const newBox = { ...board[x][y], isOpen: true };
      const newRow = [...board[x]];
      const newBoard = [...board];

      newRow[y] = newBox;
      newBoard[x] = newRow;

      if (gameStatus) {
        return {
          ...state,
          board: newBoard,
          availableBoxes: availableBoxes - 1,
        };
      }

      // 1st button pressed
      return {
        ...state,
        board: newBoard,
        timer: moment(),
        gameStatus: 1,
        availableBoxes: availableBoxes - 1,
      };
    }
    default: return state;
  }
}
