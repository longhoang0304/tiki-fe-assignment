import React from 'react';
import PropTypes from 'prop-types';
import { BoxStyled } from './Box.styled';

const renderCellData = (data) => {
  if (!data) return '';
  if (data < 0) return 'x';
  return data;
};

const Box = ({ box, openBox }) => {
  if (box.isOpen) {
    return (
      <BoxStyled>
        {renderCellData(box.data)}
      </BoxStyled>
    );
  }
  return (
    <BoxStyled
      isClose
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
};

export default Box;
