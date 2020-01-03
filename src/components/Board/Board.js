import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Board = ({ fetchBoard, board }) => {
  useEffect(() => {
    fetchBoard();

    return undefined; // no un-sub event
  }, []);

  console.log(board);

  return null;
};

Board.propTypes = {
  fetchBoard: PropTypes.func.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default Board;
