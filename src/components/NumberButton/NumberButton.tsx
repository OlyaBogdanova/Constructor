import React, {useContext} from "react";
import { NumberContext } from "../NumberProvider";
import "./NumberButton.scss";

type Props = {
  label: number | string;
};

const NumberButton = ({ label }: Props) => {
  const { handleSetDisplayValue, typeOfCalc } = useContext(NumberContext);
  let classList = "numberBtn3";
  if (label === '0') {
    classList = "numberBtn2";
  }
  if(typeOfCalc==='Constructor'){
    classList= classList+ ' nonEvents'
  }

  return (
    <div className={classList}>
      <button className="numberBtn" onClick={()=>handleSetDisplayValue(label)}> {label}</button>
    </div>
  );
};

export default NumberButton;
