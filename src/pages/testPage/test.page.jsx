 import { Container, Typography, Button, Card, CardContent, Modal } from '@mui/material';
import { useState } from 'react';
import { TestData } from './data';
import Box from '@mui/material/Box';
import { CreateQuestion} from '../modalPages/createQuestion';

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
        tests.map((test) => {
          return (
            <><Typography style={{
              fontWeight: '700',
              fontSize: '2rem',
              margin: '2rem 0',
            }}>{test.module}</Typography>
              {test.questions.map((question) => (
                <Card style={{
                  cursor: 'pointer',
                  margin: '20px 0',
                  border: '1px solid #ccc',
                }}>
                  <CardContent>
                    <Typography>{
                        question.type === 'complete' ? (
                           <div>{ question.content.map( (element) => (<div>{element.replaceAll('%', '________________ ')}</div>))}</div>
                        ) : question.type === 'corespondence' ? (
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center', paddingLeft: 150}}>
                                <div style={{width: '40%'}}>{question.variables.map( (variable) => (<div>{variable + '  -'}</div>))}</div>
                                <div style={{width: '40%'}}>{question.units.map( (unit) => (<div>{'-  ' + unit}</div>))}</div>
                            </div>
                        ) : question.type === 'problem1' ? (
                            <div>
                                <div>{question.content}</div>
                                {[
                                    ...Array(question.lines),
                                ].map((value, index) => (
                                    <div style={{height: 15}} id={index + 1} key={index}/>
                                ))
                                }
                            </div>
                        ) : question.type === 'problem2' ? (
                        <div style={{flexDirection: 'row'}}>
                        <div>{question.content}</div>
                        <img style={{width: `${question.size}`, height: 'auto'}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VSsB5gjCBI_3QFkKTlzI3gHaDt%26pid%3DApi&f=1" />
                        </div>
                        ) : question.type === 'boolean' ? (
                            <div>
                                {
                                    question.content.map( element => (
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <div style={{width: '90%'}}>{element}</div>
                                            <div style={{width: '10%', textAlign: 'center'}}> A  F </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : <div>Err</div>
                    }
                    </Typography>
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
        <Box sx={modalStyle}>
         <CreateQuestion />
        </Box>
      </Modal>
    </Container>
  )
}

const modalStyle = {
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