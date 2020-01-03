import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  top: 0px;
  left: 0px;
  color: #fff;
  font-size: 24px;
  
  ${(props) => props.isOpen && css`
    display: flex;
  `}
`;

export const RestartBtn = styled.button`
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 15px;
  background: unset;
  border: unset;
  outline: unset;
  color: #fff;
  
  &:hover {
    cursor:pointer;
    text-decoration: underline;
  }
`;

export const HomeLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  
  &:hover {
    cursor:pointer;
    text-decoration: underline;
  }
`;
