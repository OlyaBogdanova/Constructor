import React, { useState } from "react";

export const NumberContext = React.createContext();

const NumberProvider = (props) => {
  const [number, setNumber] = useState("");
  const [storedNumber, setStoredNumber] = useState("");
  const [mathType, setMathType] = useState("");
  const [typeOfCalc, setTypeOfCalc] = useState("Constructor");


  function changeType(val) {
    setNumber("");
    setStoredNumber('')
    setTypeOfCalc(val);
  }

  function handleSetDisplayValue(val) {
    setNumber((prevVal) => prevVal + val);
  }

  function changeMathType(val) {
    if (!mathType) {
      setMathType(val);
      setStoredNumber(number);
      setNumber("");
    } else {
      setMathType(val);
    }
  }

  function addResult() {
    if (mathType) {
      let tempRes = 0;
      if (mathType === "+") {
        tempRes = parseFloat(storedNumber) + parseFloat(number);
      }
      if (mathType === "-") {
        tempRes = parseFloat(storedNumber) - parseFloat(number);
      }
      if (mathType === "*") {
        tempRes = parseFloat(storedNumber) * parseFloat(number);
      }
      if (mathType === "/") {
        tempRes = parseFloat(storedNumber) / parseFloat(number);
      }
      if (tempRes === Infinity || tempRes === -Infinity ) {
    
        setNumber("Не определено");
        setTimeout(() => {
          setNumber("");
          setStoredNumber('')
        }, 3000);
      } else {
        setNumber(Math.floor(tempRes * 100000) / 100000);
      }
      setMathType("");
    }
  }

  return (
    <NumberContext.Provider
      value={{
        number,
        setNumber,
        handleSetDisplayValue,
        changeMathType,
        changeType,
        typeOfCalc,
        storedNumber,
        addResult,
        mathType,
      }}
    >
      {props.children}
    </NumberContext.Provider>
  );
};

export default NumberProvider;
