import React from 'react';
import Board from '../../components/Board';
import {
  actions as MineSweeperActions,
  selectors as MineSweeperSelectors,
} from '../../reducers/minesweeper';
import { useActions, useShallowEqualSelector } from '../../utils/hooks';

const AdvantageBoard = () => {
  const fetchMineSweeperBeginnerBoard = useActions(
    MineSweeperActions.fetchMineSweeperBeginnerBoard,
  );
  const board = useShallowEqualSelector(MineSweeperSelectors.getBoard);
  const isLoading = useShallowEqualSelector(MineSweeperSelectors.isLoading);
  const errorMsg = useShallowEqualSelector(MineSweeperSelectors.getErrorMsg);

  return (
    <Board
      board={board}
      isLoading={isLoading}
      errorMsg={errorMsg}
      fetchBoard={fetchMineSweeperBeginnerBoard}
    />
  );
};

export default AdvantageBoard;
