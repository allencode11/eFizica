import { Container, Typography, Button, Card, CardContent, Modal } from '@mui/material';
import { useState } from 'react';
import { TestData } from './data';
import Box from '@mui/material/Box';

export const TestPage = () => {
  const [tests, setTests] = useState(TestData);
  const [open, setOpen] = useState(false);

  return (
    <Container maxWidth="md">
      <div style={{
        margin: '20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography>
          Selecteaza intrebari sau creaza proprii
        </Typography>
        <Button onClick={() => setOpen(!open)} variant="contained">
          Creaza intrebare
        </Button>
      </div>
      <hr />
      {
        tests.map((cl) => {
          return (
            <><Typography style={{
              fontWeight: '700',
              fontSize: '2rem',
              margin: '2rem 0',
            }}>{cl.module}</Typography>
              {cl.questions.map((question) => (
                <Card style={{
                  cursor: 'pointer',
                  margin: '20px 0',
                  border: '1px solid #ccc',
                }}>
                  <CardContent>
                    <Typography>{ question.content }</Typography>
                  </CardContent>
                </Card>
              ))}
            </>
            );
        })
      }
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Container>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};