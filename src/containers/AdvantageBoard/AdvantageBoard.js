import React from 'react';
import Board from '../../components/Board';
import { actions as MineSweeperActions, selectors as MineSweeperSelectors } from '../../reducers/minesweeper';
import { useActions, useShallowEqualSelector } from '../../utils/hooks';

const AdvantageBoard = () => {
  const fetchMineSweeperAdvantageBoard = useActions(
    MineSweeperActions.fetchMineSweeperAdvantageBoard,
  );
  const board = useShallowEqualSelector(MineSweeperSelectors.getBoard);
  const isLoading = useShallowEqualSelector(MineSweeperSelectors.isLoading);

  return (
    <Board
      board={board}
      isLoading={isLoading}
      fetchBoard={fetchMineSweeperAdvantageBoard}
    />
  );
};

export default AdvantageBoard;
