import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';

export const TestItems = ({ itemsArr }) => {
  const [items, setItems] = useState([]);
  
  return (
      <Container maxWidth="xl">
        <div style={{
          margin: '20px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Typography>
            Selecteaza intrebari sau creaza proprii
          </Typography>

        </div>
      </Container>
  );
}
