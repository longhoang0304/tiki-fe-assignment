import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LevelBtn = styled(Link)`
  color: #000;
  margin-bottom: 25px;
  text-decoration: none;
  font-size: 24px;
  
  &:hover {
    text-decoration: underline;
  }
`;
