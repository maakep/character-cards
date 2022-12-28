import * as React from "react";


export function App() {
  const [data, setData] = React.useState(window.serverData);

  console.log(data);

  return <div>{data}</div>;
}
