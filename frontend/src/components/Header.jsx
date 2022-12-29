import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  height: 36px;
  width: 100%;
  border-bottom: solid 1px black;
`;

const Button = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export function Header({ setMenuVisible }) {
  return (
    <Bar>
      <Button onClick={setMenuVisible}>☰</Button>
    </Bar>
  );
}
