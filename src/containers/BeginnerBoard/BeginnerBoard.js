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

  return (
    <Board
      board={board}
      isLoading={isLoading}
      fetchBoard={fetchMineSweeperBeginnerBoard}
    />
  );
};

export default AdvantageBoard;
