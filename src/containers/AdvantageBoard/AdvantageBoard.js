import React from 'react';
import Board from '../../components/Board';
import { actions as MineSweeperActions, selectors as MineSweeperSelectors } from '../../reducers/minesweeper';
import { useActions, useShallowEqualSelector } from '../../utils/hooks';

const AdvantageBoard = () => {
  const fetchMineSweeperAdvantageBoard = useActions(
    MineSweeperActions.fetchMineSweeperAdvantageBoard,
  );
  const board = useShallowEqualSelector(MineSweeperSelectors.getBoard);

  return (
    <Board board={board} fetchBoard={fetchMineSweeperAdvantageBoard} />
  );
};

export default AdvantageBoard;
