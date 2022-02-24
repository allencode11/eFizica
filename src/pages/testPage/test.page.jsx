import { Container, Typography, Button, Card, CardContent, Modal } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { TestData } from './data';
import Box from '@mui/material/Box';
import { CreateQuestion} from '../modalPages/createQuestion';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getQuestion } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';

export const TestPage = () => {
  const [tests, setTests] = useState(TestData);
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState('7');
  const [module, setModule] = useState('forta');

  let print = [];

  const addToPrint = async (printTest, question) => {
    const found = printTest.find(element => element.condition === question.condition);
    if(found) {
      for( let i = 0; i < printTest.length; i++){
        if ( printTest[i].condition === question.condition) {
          printTest.splice(i, 1);
          i--;
        }
      }
    } else {
      printTest.push(question);
    }
    console.log(print);
    console.log(printTest.find(element => element.condition === question.condition));
  }

  const handleGrade = async (event) => {
    setGrade(event.target.value);
  };
  const handleModule = async (event) => {
    setModule(event.target.value);
  }

  const fetchMyAPI = useCallback(async () => {
    let questions = await getQuestion(grade, module);
    setTests(questions);

  }, [grade, module]);

  useEffect( () => {
    fetchMyAPI();
  }, [fetchMyAPI]);

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
            <MenuItem value={'Mișcarea și repausul'}>Mișcarea și repausul</MenuItem>
            <MenuItem value={'Interacțiuni'}>Interacțiuni</MenuItem>
            <MenuItem value={'Statica fluidelor'}>Statica fluidelor</MenuItem>
            <MenuItem value={'Lucrul mecanic, puterea si energia mecanica'}>Lucrul mecanic, puterea și energia mecanică</MenuItem>
            <MenuItem value={'Echilibrul de rotație'}>Echilibrul de rotație</MenuItem>
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
                <Card
                  onClick={ async () => { await addToPrint(print, question)}}
                  style={{
                  cursor: 'pointer',
                  margin: '20px 0',
                  border: '1px solid #ccc',
                }}>
                  <CardContent>
                    <Typography>{
                        question.questionType === 'complete' ? (
                           <div>{ question.condition.map( (element) => (<div>{element.replaceAll('%', '________________ ')}</div>))}</div>
                        ) : question.questionType === 'correspondence' ? (
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center', paddingLeft: 150}}>
                                <div style={{width: '40%'}}>{question.condition[0].split(',').map( (variable) => (<div>{variable + '  -'}</div>))}</div>
                                <div style={{width: '40%'}}>{question.condition[1].split(',').map( (unit) => (<div>{'-  ' + unit}</div>))}</div>
                            </div>
                        ) : question.questionType === 'problem1' ? (
                            <div>
                                <div>{question.condition[0]}</div>
                                {[
                                    ...Array(Number(question.condition[1])),
                                ].map((value, index) => (
                                    <div style={{height: 25}} id={index + 1} key={index}/>
                                ))
                                }
                            </div>
                        ) : question.questionType === 'problem2' ? (
                        <div style={{flexDirection: 'column'}}>
                          <div>{question.condition[0]}</div>
                          <img style={{width: `${question.condition[2]}`, height: 'auto'}} src={question.condition[1]}/>
                          {[
                            ...Array(Number(question.condition[3])),
                          ].map((value, index) => (
                            <div style={{height: 15}} id={index + 1} key={index}/>
                          ))
                          }
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
              <Link to={"/printedTest"}>Print</Link>
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