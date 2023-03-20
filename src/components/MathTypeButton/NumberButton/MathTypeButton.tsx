import React, {useContext} from "react";
import { NumberContext } from "../../NumberProvider";
import "./MathTypeButton.scss";

type Props = {
  label: number | string;
};

const MathTypeButton = ({ label }: Props) => {
  const { changeMathType, typeOfCalc } = useContext(NumberContext);
  let classList='numberBtn4'
  if(typeOfCalc==='Constructor'){
    classList= classList+ ' nonEvents'
  }
  return (
    <div className={classList}>
      <button className="numberBtn" onClick={()=>changeMathType(label)}> {label}</button>
    </div>
  );
};

export default MathTypeButton;
