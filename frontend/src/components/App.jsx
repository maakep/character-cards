import * as React from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { Body } from "./Body";

export function App() {
  const data = window.serverData.pcs;
  const [selectedNames, setSelectedNames] = React.useState([]);
  const [menuVisible, setMenuVisible] = React.useState(true);

  const selection = selectedNames.map((x) => data.find((y) => y.name == x));
  const names = data.map((x) => x.name);

  function addName(name) {
    setSelectedNames([...selectedNames, name]);
  }

  function removeName(name) {
    setSelectedNames([...selectedNames.filter((x) => x != name)]);
  }

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  return (
    <>
      <Header setMenuVisible={toggleMenu} />
      <Menu names={names} selectedNames={selectedNames} addName={addName} removeName={removeName} visible={menuVisible} />
      <Body selection={selection} removeName={removeName} />
    </>
  );
}
