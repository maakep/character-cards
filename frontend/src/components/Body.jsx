import React from "react";
import styled from "styled-components";
import { Card } from "./Card";

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export function Body({ selection, removeName }) {
  return (
    <CardWrapper>
      {selection?.map((x) => {
        return <Card key={x.name} removeName={removeName} hero={x}></Card>;
      })}
    </CardWrapper>
  );
}
