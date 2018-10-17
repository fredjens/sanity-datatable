import styled from 'styled-components';

/**
* Primitives
*/

export const Heading = styled.h2`
  font-size: 20px;
  font-weight: 200;
`;

export const Container = styled.div`
  width: 100%;
  background: none;
  margin-bottom: 1rem;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
`;

export const Cell = styled.input`
  display: block;
  width: 100%;
  border: none;
  background: #f2f2f2;
  margin: 1px;
  box-shadow: none;
  padding: 5px;

  &:focus {
    outline: 1px solid #666;
  }
`;

export const Empty = styled.div`
  padding: .35rem;
  color: #666;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 13px;
  background: repeating-linear-gradient(
    45deg,
    #e1e1e1,
    #e1e1e1 10px,
    #f2f2f2 10px,
    #f2f2f2 20px
  );
  text-align: center;
`;
