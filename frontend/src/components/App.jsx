import * as React from 'react';
import { Header } from './Header';
import { Menu } from './Menu';
import { Body } from './Body';

export function App() {
  const data = window.serverData.pcs;
  const [selectedNames, setSelectedNames] = React.useState([]);
  const [menuVisible, setMenuVisible] = React.useState(true);

  function handleKey(e) {
    if (e.key == 'Tab' || e.key == 'Escape') {
      e.preventDefault();
      setMenuVisible(!menuVisible);
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuVisible]);

  const selection = selectedNames.map((x) => data.find((y) => y.name == x));
  const names = data.map((x) => x.name);

  function toggleNames(names) {
    const newSelection = [...selectedNames];

    for (const n of names) {
      if (selectedNames.includes(n)) {
        newSelection.splice(newSelection.indexOf(n), 1);
      } else {
        newSelection.push(n);
      }
    }
    setSelectedNames(newSelection);
  }

  function toggleName(name) {
    const isAdd = !selectedNames.includes(name);
    if (isAdd) {
      addName(name);
    } else {
      removeName(name);
    }
  }

  function addName(name) {
    setSelectedNames([...selectedNames, name]);
  }

  function removeName(name) {
    setSelectedNames(selectedNames.filter((x) => x != name));
  }

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  return (
    <>
      <Header setMenuVisible={toggleMenu} />
      <Menu names={names} selectedNames={selectedNames} toggleNames={toggleNames} toggleName={toggleName} visible={menuVisible} />
      <Body closeMenu={() => setMenuVisible(false)} selection={selection} removeName={removeName} />
    </>
  );
}
