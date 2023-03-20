import React, { memo } from "react";
import NumberButton from "../NumberButton/NumberButton";
import "./NumberContainer.scss";
import { useDrag } from "react-dnd";
import MathTypeButton from "../MathTypeButton/NumberButton/MathTypeButton";

type Props = {
  data: Array<number | string>;
  basis?: string;
  wrap?: boolean;
  disabled: boolean;
  hover:boolean

};

const NumberContainer = ({ data, wrap = true, basis, disabled }: Props) => {
  let styles = "container";
  styles = wrap ? styles + " wrap" : styles;
  styles = disabled ? styles + " disabled" : styles;
  const elements = data.map((elem) => {
    return basis!=='4' ? <NumberButton label={elem}  /> : <MathTypeButton label={elem}/>;
  });
  return <div className={styles}>{elements}</div>;
};

export default NumberContainer;
