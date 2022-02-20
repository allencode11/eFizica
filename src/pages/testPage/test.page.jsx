import { Container, Typography, Button, Card, CardContent, Modal } from '@mui/material';
import { useState } from 'react';
import { TestData } from './data';
import Box from '@mui/material/Box';
import { CreateQuestion} from '../modalPages/createQuestion';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { getQuestion } from '../../firebase/firebase.utils';

export const TestPage = () => {
  const [tests, setTests] = useState(TestData);
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState(false);
  const [module, setModule] = useState(false);

  const handleGrade = (event) => {
    setGrade(event.target.value);
  };
  const handleModule = (event) => {
    setModule(event.target.value);
  };

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

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <div style={{width: 300}}>
          <InputLabel id="demo-simple-select-label">Module</InputLabel>
          <Select style={{width: '100%'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={module}
            label="Grade"
            onChange={handleModule}
          >
            <MenuItem value={'forta'}>Forta</MenuItem>
            <MenuItem value={'oscilatii'}>oscilatii</MenuItem>
            <MenuItem value={'8'}>8</MenuItem>
          </Select>
        </div>

        <div style={{width: 300}}>
          <InputLabel id="demo-simple-select-label">Grade</InputLabel>
          <Select style={{width: '100%'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={grade}
            label="Grade"
            onChange={handleGrade}
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </div>

        <Button
          style={{width: 100, height: 45, marginTop: 27}}
          variant="contained" onClick={ async () => {
            console.log(tests)
            setTests( await getQuestion(grade, module))
          }}>
          Cauta
        </Button>
      </div>
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
                        question.questionType === 'complete' ? (
                           <div>{ question.condition.map( (element) => (<div>{element.replaceAll('%', '________________ ')}</div>))}</div>
                        ) : question.questionType === 'corespondence' ? (
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center', paddingLeft: 150}}>
                                <div style={{width: '40%'}}>{question.variables.map( (variable) => (<div>{variable + '  -'}</div>))}</div>
                                <div style={{width: '40%'}}>{question.units.map( (unit) => (<div>{'-  ' + unit}</div>))}</div>
                            </div>
                        ) : question.questionType === 'problem1' ? (
                            <div>
                                <div>{question.condition}</div>
                                {[
                                    ...Array(question.lines),
                                ].map((value, index) => (
                                    <div style={{height: 15}} id={index + 1} key={index}/>
                                ))
                                }
                            </div>
                        ) : question.questionType === 'problem2' ? (
                        <div style={{flexDirection: 'row'}}>
                        <div>{question.condition}</div>
                        <img style={{width: `${question.size}`, height: 'auto'}} src="https://external-Content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VSsB5gjCBI_3QFkKTlzI3gHaDt%26pid%3DApi&f=1" />
                        </div>
                        ) : question.questionType === 'boolean' ? (
                            <div>
                                {
                                    question.condition.map( element => (
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