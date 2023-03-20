import React, { useContext } from "react";
import { NumberContext } from "../NumberProvider";
import "./Display.scss";

type Props = {
  disabled: boolean;
  hover: boolean;
};

const Display = ({ disabled }: Props) => {
  const classList = disabled ? "container disabled" : "container";
  const { number, storedNumber } = useContext(NumberContext);
  let val;
  if (storedNumber && !number) {
    val = storedNumber;
  } else if ((storedNumber && number) || (!storedNumber && number) ) {
    val = number;
  } else if(storedNumber===number && number===''){
    val = ''
  }
  return (
    <div className={classList}>
      <input
        value={val}
        maxLength={6}
        type="text"
        placeholder="0"
        readOnly
        className="display_input"
      />
    </div>
  );
};

export default Display;
