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

export const HeaderWrapper = styled.div`
  margin-bottom: 25px;
`;

export const RestartBtn = styled.button`
  font-size: 18px;
  margin-left: 15px;
  background: unset;
  border: unset;
  outline: unset;
  
  &:hover {
    text-decoration: underline;
    cursor:pointer;
  }
`;

export const HomeLink = styled(Link)`
  font-size: 18px;
  color: #000;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const BoardWrapper = styled.div`
`;

export const ErrorMsg = styled.div`
  color: crimson;
  font-size: 24px;
`;
