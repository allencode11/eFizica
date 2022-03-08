import { Container, Typography, Button, Card, CardContent, Modal } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { CreateQuestion} from '../modalPages/createQuestion';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getQuestion } from '../../firebase/firebase.utils';
import { CompleteItem } from '../../components/Items/Complete.component';
import { CorrespondenceItem } from '../../components/Items/Correspondence.component';
import { FirstProblemItem } from '../../components/Items/Problem1.component';
import { SecondProblemItem } from '../../components/Items/Problem2.component';
import { BooleanItem } from '../../components/Items/Boolean.component';

const selectData = [
  {
    section: 'complete',
    items: 3,
    component: 'Complete',
  },
  {
    section: 'correspondence',
    items: 5,
    component: 'Correspondence',
  },
  {
    section: 'boolean',
    items: 3,
    component: 'Boolean',
  },
  {
    section: 'problem1',
    items: 2,
    component: 'FirstProblem',

  },
  {
    section: 'problem2',
    items: 1,
    component: 'SecondProblem',
  },
]

export const TestPage = () => {
  const [tests, setTests] = useState([]);
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState('7');
  const [module, setModule] = useState('Statica fluidelor');
  const [position, setPosition] = useState(0);

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

        <Button onClick={() => setOpen(!open)} variant="contained">
          Creaza intrebare
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        { tests[0] &&
          <Typography
            style={{ fontWeight: '700',
              fontSize: '2rem',
              margin: '2rem 0',
              color: '#1e90ff'
            }}>
            {tests[0].module}
          </Typography>
        }


      </div>
      <div>
          <div>
            <Typography>
              Selecteaza {selectData[position].items} itemi
            </Typography>
            <div>
              {
                tests.map((test) => {
                  return (
                    <div>
                      {test.questions
                        .filter(item => item.questionType === selectData[position].section)
                        .map((question) => (
                          <Card
                            onClick={async () => {
                              await addToPrint(print, question);
                              console.log(print)
                              console.log(...print)
                            }}
                            style={{
                              cursor: 'pointer',
                              margin: '20px 0',
                              border: '1px solid #ccc',
                            }}>
                            <CardContent>
                              <Typography>
                                {/*{ () => (`${selectData[position].component + 'Item'} item={question}/`)}*/}
                                {
                                question.questionType === 'complete' ? (
                                  <CompleteItem item={question}/>
                                ) : question.questionType === 'correspondence' ? (
                                  <CorrespondenceItem item={question}/>
                                ) : question.questionType === 'problem1' ? (
                                  <FirstProblemItem item={question}/>
                                ) : question.questionType === 'problem2' ? (
                                  <SecondProblemItem item={question}/>
                                ) : question.questionType === 'boolean' ? (
                                  <BooleanItem item={question}/>
                                ) : <div>Err</div>
                              }
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  );
                })
              }
            </div>
            {/*{*/}
            {/*  print.length === 3 && */}
            {/*  <Button onClick={ () => { setPosition(position + 1)}}>Next</Button>*/}
            {/*}*/}
            <Button onClick={ () => { setPosition(position + 1)}}>Next</Button>
          </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
         <CreateQuestion />
          <Button style={{marginTop: 5, width: '100%'}} variant="contained" onClick={() => setOpen(!open)} variant="contained">
            Finish
          </Button>
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