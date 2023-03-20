import React from "react";
import "./App.scss";
import NumberProvider from "./components/NumberProvider";
import Calculator from "./components/Calculator/Calculator";

function App() {
  return (
    <NumberProvider>
      <Calculator />
    </NumberProvider>
  );
}

export default App;
