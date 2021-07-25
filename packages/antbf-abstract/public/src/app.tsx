import React from 'react';
import AntbfAbstract from '../../src/main';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default (props: any) => {
  return (
    <Container>
      <AntbfAbstract />
    </Container>
  );
};
