import reducer, {
  initialState,
  actions as MineSweeperActions,
} from './minesweeperReducer';

jest.mock('moment', () => () => 0);

describe('minesweeper reducers ', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle reset options', () => {
    expect(reducer({}, MineSweeperActions.resetBoard())).toEqual(initialState);
  });

  it('should handle fetchMineSweeperBeginnerBoard action', () => {
    const newState = {
      ...initialState,
      isLoading: true,
      errorMsg: null,
      gameStatus: 0,
      board: [],
      timer: 0,
      openedBox: 0,
      availableBoxes: 9 * 9 - 10,
    };
    expect(reducer(
      initialState,
      MineSweeperActions.fetchMineSweeperBeginnerBoard(),
    )).toEqual(newState);
  });

  it('should handle fetchMineSweeperAdvantageBoard action', () => {
    const newState = {
      ...initialState,
      isLoading: true,
      errorMsg: null,
      gameStatus: 0,
      board: [],
      timer: 0,
      openedBox: 0,
      availableBoxes: 16 * 16 - 40,
    };
    expect(reducer(
      initialState,
      MineSweeperActions.fetchMineSweeperAdvantageBoard(),
    )).toEqual(newState);
  });

  it('should handle fetchMineSweeperBoardSuccess action', () => {
    const board = [
      [
        {
          x: 0,
          y: 0,
          data: -1,
          isOpen: false,
        },
        {
          x: 0,
          y: 1,
          data: 0,
          isOpen: false,
        },
      ],
      [
        {
          x: 1,
          y: 0,
          data: 0,
          isOpen: false,
        },
        {
          x: 1,
          y: 0,
          data: 0,
          isOpen: false,
        },
      ],
    ];
    const mines = [
      { x: 0, y: 0 },
    ];
    const newState = {
      ...initialState,
      isLoading: false,
      board,
      mines,
    };
    expect(reducer(
      initialState,
      MineSweeperActions.fetchMineSweeperBoardSuccess(board, mines),
    )).toEqual(newState);
  });

  it('should handle openBox action', () => {
    const board = [
      [
        {
          x: 0,
          y: 0,
          data: -1,
          isOpen: false,
        },
        {
          x: 0,
          y: 1,
          data: 0,
          isOpen: false,
        },
      ],
      [
        {
          x: 1,
          y: 0,
          data: 0,
          isOpen: false,
        },
        {
          x: 1,
          y: 0,
          data: 0,
          isOpen: false,
        },
      ],
    ];
    const mines = [
      { x: 0, y: 0 },
    ];
    const newState = {
      ...initialState,
      isLoading: false,
      gameStatus: 3,
      board,
      mines,
    };
    expect(reducer(
      {
        ...initialState,
        board,
        mines,
      },
      MineSweeperActions.openBox({
        x: 0,
        y: 0,
        data: -1,
        isOpen: false,
      }),
    )).toEqual(newState);
  });

  it('should handle openBox action 2', () => {
    const board = [
      [
        {
          x: 0,
          y: 0,
          data: -1,
          isOpen: false,
        },
        {
          x: 0,
          y: 1,
          data: 1,
          isOpen: false,
        },
      ],
      [
        {
          x: 1,
          y: 0,
          data: 1,
          isOpen: false,
        },
        {
          x: 1,
          y: 1,
          data: 1,
          isOpen: false,
        },
      ],
    ];
    const mines = [
      { x: 0, y: 0 },
    ];
    const newBox = { ...board[0][1], isOpen: true };
    const newRow = [...board[0]];
    const newBoard = [...board];

    newRow[1] = newBox;
    newBoard[0] = newRow;
    const newState = {
      ...initialState,
      gameStatus: 1,
      board: newBoard,
      mines,
      availableBoxes: 2,
    };
    expect(reducer(
      {
        ...initialState,
        board,
        mines,
        availableBoxes: 3,
      },
      MineSweeperActions.openBox({
        x: 0,
        y: 1,
        data: 0,
        isOpen: false,
      }),
    )).toEqual(newState);
  });

  it('should handle game over', () => {
    const board = [
      [
        {
          x: 0,
          y: 0,
          data: -1,
          isOpen: false,
        },
        {
          x: 0,
          y: 1,
          data: 1,
          isOpen: false,
        },
      ],
      [
        {
          x: 1,
          y: 0,
          data: 1,
          isOpen: false,
        },
        {
          x: 1,
          y: 1,
          data: 1,
          isOpen: false,
        },
      ],
    ];
    const mines = [
      { x: 0, y: 0 },
    ];
    const newBox = { ...board[0][0], isOpen: true };
    const newRow = [...board[0]];
    const newBoard = [...board];

    newRow[0] = newBox;
    newBoard[0] = newRow;
    const newState = {
      ...initialState,
      gameStatus: 3,
      board: newBoard,
      mines,
    };
    expect(reducer(
      {
        ...initialState,
        board,
        mines,
      },
      MineSweeperActions.gameOver(),
    )).toEqual(newState);
  });

  it('should handle batch open', () => {
    const board = [
      [
        {
          x: 0,
          y: 0,
          data: -1,
          isOpen: false,
        },
        {
          x: 0,
          y: 1,
          data: 1,
          isOpen: false,
        },
      ],
      [
        {
          x: 1,
          y: 0,
          data: 1,
          isOpen: false,
        },
        {
          x: 1,
          y: 1,
          data: 1,
          isOpen: false,
        },
      ],
    ];
    const mines = [
      { x: 0, y: 0 },
    ];
    const newBox1 = { ...board[1][0], isOpen: true };
    const newBox2 = { ...board[1][1], isOpen: true };
    const newRow = [...board[1]];
    const newBoard = [...board];

    newRow[0] = newBox1;
    newRow[1] = newBox2;
    newBoard[1] = newRow;
    const newState = {
      ...initialState,
      board: newBoard,
      mines,
    };
    expect(reducer(
      {
        ...initialState,
        board,
        mines,
      },
      MineSweeperActions.openNeighbor([{ x: 1, y: 0 }, { x: 1, y: 1 }]),
    )).toEqual(newState);
  });
});
