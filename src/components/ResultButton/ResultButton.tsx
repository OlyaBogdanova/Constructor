import React, {useContext} from 'react'
import { NumberContext } from "../NumberProvider";
import './ResultButton.scss'
type Props = {
  disabled:false,
  hover:boolean
}

const ResultButton = (props: Props) => {
  const { addResult, typeOfCalc } = useContext(NumberContext);

  let classList= typeOfCalc==='Runtime' ? 'container run' : 'container'


  return (
    <div className={classList} >
        <div className='result' onClick={()=>addResult()}>=</div>
    </div>
  )
}

export default ResultButton