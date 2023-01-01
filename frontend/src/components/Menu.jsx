import React, { createRef, useRef } from 'react';
import styled from 'styled-components';

const MenuWrapper = styled.div`
  transition: 0.2s all ${(p) => (p.visible ? 'ease-out' : 'ease-in')};
  position: fixed;
  left: ${(p) => (p.visible ? '0' : '-250px')};
  width: 250px;
  height: calc(100vh - 36px);
  display: flex;
  background: black;
  flex-direction: column;
  z-index: 1;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const SearchBox = styled.div`
  padding: 16px 8px;
  display: grid;
`;

const Search = styled.input`
  padding: 6px;
`;

const NameItem = styled.div`
  padding: 8px;
  border-bottom: solid 1px grey;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const Name = styled.div``;
const AddOrRemove = styled.div`
  height: 22px;
  padding: 0 6px;
  transition: ease-in-out 0.6s all;
  rotate: ${(p) => (p.isAdd ? '0deg' : '405deg')};
  color: ${(p) => (p.isAdd ? 'white' : 'red')};
`;

export function Menu({ names, selectedNames, addName, toggleName, toggleNames, visible }) {
  const [filter, setFilter] = React.useState('');
  const filterRef = useRef();
  filterRef.current = names.filter((x) => filter.length == 0 || x.toLowerCase().includes(filter));
  const filteredNames = filterRef.current;

  const inputRef = createRef();

  function addSearchedNames(e) {
    if (e.key == 'Enter') {
      toggleNames(filterRef.current);
      setFilter('');
    }
  }

  React.useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', addSearchedNames);
      inputRef.current.focus();
    } else {
      document.removeEventListener('keydown', addSearchedNames);
    }

    return () => {
      document.removeEventListener('keydown', addSearchedNames);
    };
  }, [visible, selectedNames]);

  return (
    <MenuWrapper visible={visible}>
      <SearchBox>
        <Search ref={inputRef} value={filter} type='text' onChange={(e) => setFilter(e.currentTarget.value)} />
      </SearchBox>

      {filteredNames.map((x) => {
        const isAdd = !selectedNames.includes(x);

        return (
          <NameItem key={x} onClick={() => toggleName(x)}>
            <Name>{x}</Name>
            <AddOrRemove isAdd={isAdd}>+</AddOrRemove>
          </NameItem>
        );
      })}
    </MenuWrapper>
  );
}
