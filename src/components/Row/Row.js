import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { RowWrapper } from './Row.styled';
import Box from '../../containers/Box';

const Row = memo(({ row }) => (
  <RowWrapper>
    {row.map((box, index) => <Box box={box} key={index} />)}
  </RowWrapper>
));

Row.propTypes = {
  row: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      data: PropTypes.number,
      isOpen: PropTypes.bool,
    }),
  ).isRequired,
};

export default Row;
