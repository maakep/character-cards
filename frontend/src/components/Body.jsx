import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: baseline;
  min-height: calc(100vh - 40px);
`;

export function Body({ selection, removeName, closeMenu }) {
  return (
    <CardWrapper onClick={() => closeMenu()}>
      {selection?.map((x) => {
        return <Card key={x.name} removeName={removeName} hero={x}></Card>;
      })}
    </CardWrapper>
  );
}
