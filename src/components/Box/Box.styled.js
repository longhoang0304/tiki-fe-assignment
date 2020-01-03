import styled, { css } from 'styled-components';

export const BoxStyled = styled.div`
  width: 35px;
  height: 35px;
  border: 1px solid #000;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${(props) => props.isClose && css`
    background: #c5c9c9;
  `}
`;
