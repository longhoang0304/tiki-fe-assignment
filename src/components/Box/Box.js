import React from 'react';
import PropTypes from 'prop-types';
import { BoxStyled } from './Box.styled';

const Box = ({ box, openBox }) => {
  if (box.isOpen) {
    return (
      <BoxStyled
        onClick={
          () => openBox(box.x, box.y)
        }
      >
        {box.data}
      </BoxStyled>
    );
  }
  return (
    <BoxStyled
      onClick={
        () => openBox(box.x, box.y)
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
