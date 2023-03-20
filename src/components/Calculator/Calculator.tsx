import React from "react";
import ButtonsBlock from "../ButtonsBlock/ButtonsBlock";
import Constructor from "../Constructor/Constructor";

type Props = {};

const Calculator = (props: Props) => {
  return (
    <div className="cont">
      <ButtonsBlock />
      <Constructor />
    </div>
  );
};

export default Calculator;
