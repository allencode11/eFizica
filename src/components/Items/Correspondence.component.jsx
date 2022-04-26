import { Button } from '@mui/material';
import React from 'react';
import { MathComponent } from 'mathjax-react';

export const CorrespondenceItem = ({ onClick, style, title, variants }) => {
  return (
    <div style={{ ...style, display: 'flex', flexDirection: 'row', textAlign: 'right', justifyContent: 'center', marginBottom: '0px'}}>
      <div style={{width: '30%', alignItems: 'center'}} onClick={() => alert('Selectati unitatea de masura iar marimea fizica se va auto-completa')}>{title}</div>
      <div style={{width: '60%', alignItems: 'center', justifyContent: 'center', height: '45px !important'}}>{variants.map( (unit) => (
        <Button
          style={{ backgroundColor: 'white', color: 'black', margin: 5, height: 25, fontSize: 12, textAlign: 'center' }}
          onClick={() => onClick(unit)}
        >
        <MathComponent tex={unit}/>
        </Button>
      ))}</div>
    </div>
  )
}