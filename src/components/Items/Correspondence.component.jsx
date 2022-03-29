import { Button } from '@mui/material';
import React from 'react';
import { MathComponent } from 'mathjax-react';

export const CorrespondenceItem = ({ onClick, style, title, variants}) => {
  return (
    <div style={{ ...style, display: 'flex', flexDirection: 'row', textAlign: 'right', justifyContent: 'space-between', width: '60%', height: '10%', margin: '10px auto'}}>
      <MathComponent onClick={() => alert('Selectati unitatea de masura iar marimea fizica se va auto-completa')} tex={title}/>
      <div>{variants.map( (unit) => (
        <MathComponent
          style={{ backgroundColor: '#1e90ff', color: 'white', margin: 5, fontSize: 12, textAlign: 'center' }}
          onClick={() => onClick(unit)}
          tex={unit}
        />
        ))}</div>
    </div>
  )
}