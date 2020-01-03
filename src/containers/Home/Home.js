import React from 'react';
import Home from '../../components/Home';
import { actions as MineSweeperActions } from '../../reducers/minesweeper';
import { useActions } from '../../utils/hooks';

const HomeContainer = () => {
  const resetBoard = useActions(
    MineSweeperActions.resetBoard,
  );

  return (
    <Home resetBoard={resetBoard} />
  );
};

export default HomeContainer;
