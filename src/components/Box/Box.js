import React from 'react';
import PropTypes from 'prop-types';
import { BoxStyled } from './Box.styled';

const { REACT_APP_CHEAT_MODE } = process.env;

const renderCellData = (data) => {
  if (!data) return '';
  if (data < 0) return 'x';
  return data;
};

const Box = ({ box, openBox }) => {
  if (box.isOpen) {
    return (
      <BoxStyled isMine={box.data < 0}>
        {renderCellData(box.data)}
      </BoxStyled>
    );
  }
  const isMine = +REACT_APP_CHEAT_MODE && box.data < 0;
  return (
    <BoxStyled
      isClose
      isMine={isMine}
      onClick={
        () => openBox(box)
      }
    />
  );
};

Box.propTypes = {
  box: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    data: PropTypes.number,
    isOpen: PropTypes.bool,
  }).isRequired,
  openBox: PropTypes.func.isRequired,
  gameStatus: PropTypes.number.isRequired,
};

export default Box;
