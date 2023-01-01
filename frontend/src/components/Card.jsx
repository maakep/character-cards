import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin: 32px;
  padding: 16px;
  background: black;
  color: #b9b9b9;
  position: relative;
  font-size: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  &:hover .hidden {
    display: block;
  }
`;

const Delete = styled.div`
  rotate: 45deg;
  right: 4px;
  top: 3px;
  position: absolute;
  cursor: pointer;
  display: none;
`;

const Row = styled.div`
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
`;

// const Notes = styled.textarea`
//   resize: none;
//   background: black;
//   color: white;
//   border: none;
//   height: 100%;
//   margin-top: 8px;
// `;

const Link = styled.a`
  color: white;
  text-decoration: none;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${(p) => p.size || 12}px;
`;

const HeroName = styled.div`
  position: absolute;
  top: -14px;
  background: black;
  font-size: 16px;
  padding: 4px;
`;
const Title = styled.div`
  color: #b9b8ff;
  font-size: ${(p) => p.size || 16}px;
`;

export function Card({ hero, removeName }) {
  const profs = Object.keys(hero)
    .filter((x) => ((x.includes('proficiency_skill') && !hero[x.replace('proficiency', 'expertise')] == true) || x.includes('expertise_skill')) && hero[x] == true)
    .map((x) => x.replace('proficiency', '').replace('expertise', '*').replace('_skill_', ' ').replaceAll('_', ' '));

  return (
    <CardWrapper>
      <Delete title='Remove from view' className='hidden' onClick={() => removeName(hero.name)}>
        +
      </Delete>
      <HeroName>
        <Link target='_blank' href={`https://europe-west1-fremi-rpg.cloudfunctions.net/dnd-pc-repo?char=${hero.name}`}>
          <Title>
            {hero.name.slice(0, 12)}, {hero.hit_point_maximum || '?'} hp
          </Title>
        </Link>
      </HeroName>
      <Row>
        <Column title='Armor Class' size={14}>
          <span>🛡️</span>
          <span>{hero.armor_class}</span>
        </Column>
        <Column title='Spell Save DC' size={14}>
          <span>🧙</span>
          <span>{hero.spell_save_dc}</span>
        </Column>
        <Column>{/* Some hacky spacing */}</Column>
        <Column title='Passive Perception' size={14}>
          <span>👀</span>
          <span>{hero.passive_wisdom}</span>
        </Column>
        <Column title='Passive Insight' size={14}>
          <span>🧠</span>
          <span>{hero.passive_insight}</span>
        </Column>
        <Column title='Passive Investigation' size={14}>
          <span>🔎</span>
          <span>{hero.passive_investigation}</span>
        </Column>
      </Row>
      <Row>
        {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((x) => (
          <Column>
            <Title size={12}>{x.slice(0, 3).toUpperCase()}</Title>
            <div>{hero[`ability_${x}`]}</div>
          </Column>
        ))}
      </Row>
      <Row>
        <div>
          <Title className='hidden'>Proficiencies</Title>
          {profs.map((x) => (
            <div key={x}>- {x}</div>
          ))}
        </div>
      </Row>
      <Row>
        <div>
          <Title className='hidden'>Other profs & languages</Title>
          <div>{hero.proficiencies_languages}</div>
        </div>
      </Row>
    </CardWrapper>
  );
}
