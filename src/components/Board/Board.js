import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BoardWrapper } from './Board.styled';
import Row from '../Row';

const Board = ({ fetchBoard, board, isLoading }) => {
  useEffect(() => {
    fetchBoard();

    return undefined; // no un-sub event
  }, []);

  if (isLoading) {
    return (
      <div>
        Preparing game for you
      </div>
    );
  }

  return (
    <BoardWrapper>
      {board.map((row, index) => (<Row row={row} key={index} />))}
    </BoardWrapper>
  );
};

Board.propTypes = {
  fetchBoard: PropTypes.func.isRequired,
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        data: PropTypes.number,
        isOpen: PropTypes.bool,
      }),
    ),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Board;
