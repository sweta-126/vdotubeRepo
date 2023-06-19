import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const Empty = () => {
  return (
    <Container>
        Login to see your subscriptions...
    </Container>
  )
}

export default Empty