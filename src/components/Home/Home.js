import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, LevelBtn } from './Home.styled';

const Home = ({ resetBoard }) => {
  useEffect(() => {
    resetBoard();
    return undefined;
  }, []);
  return (
    <Wrapper>
      <LevelBtn to="/beginner">
        Beginner
      </LevelBtn>
      <LevelBtn to="/advantage">
        Advantage
      </LevelBtn>
    </Wrapper>
  );
};

Home.propTypes = {
  resetBoard: PropTypes.func.isRequired,
};

export default Home;
