import styled from "styled-components";

export const Cell = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #e0e0e0;
  }
`;