import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 250px;
  height: 150px;
  display: flex;
  flex-direction: column;
  margin: 32px;
  padding: 16px;
  background: black;
  position: relative;
  font-size: 12px;

  &:hover {
  }
`;

const Delete = styled.div`
  rotate: 45deg;
  right: 4px;
  top: 3px;
  position: absolute;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
`;
const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Notes = styled.textarea`
  resize: none;
  background: black;
  color: white;
  border: none;
  height: 100%;
  margin-top: 8px;
`;

const Link = styled.a`
  color: white;
`;

export function Card({ hero, removeName }) {
  return (
    <CardWrapper>
      <Delete onClick={() => removeName(hero.name)}>+</Delete>
      <Title>
        <span>
          <Link target="_blank" href={`https://europe-west1-fremi-rpg.cloudfunctions.net/dnd-pc-repo?char=${hero.name}`}>
            {hero.name.slice(0, 12)}
          </Link>
        </span>
        <span>🛡️ {hero.armor_class}</span>
        <span>👀 {hero.passive_wisdom}</span>
      </Title>
      <Stats>
        <div>STR</div>
        <div>DEX</div>
        <div>CON</div>
        <div>INT</div>
        <div>WIS</div>
        <div>CHA</div>
      </Stats>
      <Stats>
        <div>{hero.ability_strength}</div>
        <div>{hero.ability_dexterity}</div>
        <div>{hero.ability_constitution}</div>
        <div>{hero.ability_intelligence}</div>
        <div>{hero.ability_wisdom}</div>
        <div>{hero.ability_charisma}</div>
      </Stats>
      <Notes />
    </CardWrapper>
  );
}
