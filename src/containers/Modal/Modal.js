import React from 'react';
import { useLocation } from 'react-router';
import moment from 'moment';
import Modal from '../../components/Modal';
import {
  actions as MineSweeperActions,
  selectors as MineSweeperSelectors,
} from '../../reducers/minesweeper';
import { useActions, useShallowEqualSelector } from '../../utils/hooks';

const ModalContainer = () => {
  const [
    fetchMineSweeperBeginnerBoard,
    fetchMineSweeperAdvantageBoard,
  ] = useActions([
    MineSweeperActions.fetchMineSweeperBeginnerBoard,
    MineSweeperActions.fetchMineSweeperAdvantageBoard,
  ]);
  const { pathname } = useLocation();
  let fetchBoard = () => null;
  const gameStatus = useShallowEqualSelector(MineSweeperSelectors.getGameStatus);
  const startTime = useShallowEqualSelector(MineSweeperSelectors.getTimer);
  const diff = startTime ? moment().diff(startTime, 'millisecond') : 0;
  const duration = moment(diff).utc().format('HH:mm:ss');

  if (pathname.includes('begin')) fetchBoard = fetchMineSweeperBeginnerBoard;
  else fetchBoard = fetchMineSweeperAdvantageBoard;

  return (
    <Modal
      isOpen={gameStatus > 1}
      gameStatus={gameStatus}
      fetchBoard={fetchBoard}
      duration={duration}
    />
  );
};

export default ModalContainer;
