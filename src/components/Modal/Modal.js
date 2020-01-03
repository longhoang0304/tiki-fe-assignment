import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, HomeLink, RestartBtn } from './Modal.styled';

const statusText = ['won', 'lost'];

const Modal = ({
  isOpen, duration, fetchBoard, gameStatus,
}) => (
  <Wrapper isOpen={isOpen}>
    <div>{`You ${statusText[gameStatus - 2]} the game in ${duration}`}</div>
    <RestartBtn onClick={() => fetchBoard()}>New Game</RestartBtn>
    <HomeLink to="/">Home Page</HomeLink>
  </Wrapper>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  duration: PropTypes.string.isRequired,
  fetchBoard: PropTypes.func.isRequired,
  gameStatus: PropTypes.number.isRequired,
};

export default Modal;
