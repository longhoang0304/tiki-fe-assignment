import React from 'react';
import Box from '../../components/Box';
import {
  actions as MineSweeperActions,
} from '../../reducers/minesweeper';
import { useActions } from '../../utils/hooks';

const BoxContainer = (props) => {
  const openBox = useActions(
    MineSweeperActions.openBox,
  );

  return (
    <Box
      {...props}
      openBox={openBox}
    />
  );
};

export default BoxContainer;
