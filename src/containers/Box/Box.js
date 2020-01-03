import React from 'react';
import Box from '../../components/Box';
import {
  actions as MineSweeperActions,
  selectors as MineSweeperSelectors,
} from '../../reducers/minesweeper';
import {useActions, useShallowEqualSelector} from '../../utils/hooks';

const BoxContainer = (props) => {
  const openBox = useActions(
    MineSweeperActions.openBox,
  );
  const gameStatus = useShallowEqualSelector(MineSweeperSelectors.getGameStatus);

  return (
    <Box
      {...props}
      openBox={openBox}
      gameStatus={gameStatus}
    />
  );
};

export default BoxContainer;
