import { Button } from '@mui/material';
import React from 'react';

export const CorrespondenceItem = ({item}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
      <div onClick={() => alert('Selectati unitatea de masura iar marimea fizica se va auto-completa')}>
        {item.condition[0]}
      </div>
      <div>{item.condition[1].split(',').map( (unit) => (
        <Button
          style={{ backgroundColor: '#1e90ff', color: 'white', margin: 5, fontSize: 12 }}
        >{unit}
        </Button>))}</div>
    </div>
  )
}