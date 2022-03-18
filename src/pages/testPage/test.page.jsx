import { Container, Typography, Button, Card, CardContent, Modal } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { CreateQuestion } from '../modalPages/createQuestion';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getQuestion } from '../../firebase/firebase.utils';
import { CompleteItem } from '../../components/Items/Complete.component';
import { CorrespondenceItem } from '../../components/Items/Correspondence.component';
import { FirstProblemItem } from '../../components/Items/Problem1.component';
import { SecondProblemItem } from '../../components/Items/Problem2.component';
import { BooleanItem } from '../../components/Items/Boolean.component';
import { PrintedTest } from '../printedTestPage/printedTest';
import { v4 as uuid } from 'uuid';

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
  const [tests, setTests] = useState({});
  const [open, setOpen] = useState(false);
  const [openPrinted, setOpenPrinted] = useState(false);
  const [grade, setGrade] = useState('7');
  const [module, setModule] = useState('Statica fluidelor');
  const [position, setPosition] = useState(0);
  const [print, setPrint] = useState([]);

  const foundItem = (Arr, q) => {
    return Arr.find(element => element.question.condition === q.condition);
  }
  const addToPrint = (printTest, question) => {
    if(foundItem(printTest, question)) {
      for( let i = 0; i < printTest.length; i++){
        if ( printTest[i].question.condition === question.condition ) {
          printTest.splice(i, 1);
          i--;
        }
      }
    } else {
      printTest.push({question, display: true});
    }
  }
  const handleGrade = async (event) => {
    setGrade(event.target.value);
  };
  const handleModule = async (event) => {
    setModule(event.target.value);
  }

  const fetchMyAPI = useCallback(async () => {
    const questions = await getQuestion(grade, module);

    const tep = []
    const temp = [...questions[0].questions]
    temp.forEach( question => tep.push({question, display: false, uuid: uuid()}));
    const data = { discipline:questions[0].discipline, grade: questions[0].grade, module: questions[0].module, questions: tep};
    setTests(data);
    console.log('tests:', tests);
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
          <InputLabel id="demo-simple-select-label">Modulul</InputLabel>
          <Select style={{width: '100%'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={module}
                  label="Modulul"
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
          <InputLabel id="demo-simple-select-label">Clasa</InputLabel>
          <Select style={{width: '100%'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={grade}
                  label="Clasa"
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
              margin: '2rem 0 0 0',
              color: '#1e90ff'
            }}>
            {
              tests[0].module === 'Lucrul mecanic, puterea si energia mecanica'
              ? 'Lucrul mecanic, puterea și energia mecanică'
              : tests[0].module
            }
          </Typography>
        }
      </div>

      <div>
        <div>
          <Typography>
            Din lista de mai jos selecteaza {selectData[position].items} itemi!
          </Typography>

          <div>
            {
              tests.questions &&
              tests.questions
              .filter(item => item.question.questionType === selectData[position].section)
              .map((element) => (
                <Card
                  key={element.uuid}
                  onClick={ () => {
                      addToPrint(print, element.question);
                      element.display = !element.display;
                      alert('Item adaugat');
                      console.log('tests:',tests);
                      console.log('print:',print);
                  }}
                  style={{
                    cursor: 'pointer',
                    margin: '20px 0 0 0',
                    border: element.display ? '1px solid #1e90ff' : '1px solid #ccc',
                  }}>
                  <CardContent style={{display: 'flex', flexDirection: 'row'}}>
                    <Typography style={{width: '97%'}}>
                      {
                      element.question.questionType === 'complete' ? (
                        <CompleteItem item={element.question}/>
                      ) : element.question.questionType === 'correspondence' ? (
                        <CorrespondenceItem item={element.question}/>
                      ) : element.question.questionType === 'problem1' ? (
                        <FirstProblemItem item={element.question}/>
                      ) : element.question.questionType === 'problem2' ? (
                        <SecondProblemItem item={element.question}/>
                      ) : element.question.questionType === 'boolean' ? (
                        <BooleanItem item={element.question}/>
                      ) : <div>Err</div>
                    }
                    </Typography>
                    {
                      element.display ? <img
                        src={require('../../assets/done.png')}
                        style={{width: '3%', height: '4%', position: 'relative', left: 12, top: -7}}/> : null
                    }
                  </CardContent>
                </Card>
              ))}
          </div>
          </div>

        {
          position < selectData.length - 1 ?
            <Button onClick={ () => {
              if (position < selectData.length - 1)
                setPosition(position + 1)
            }}>Next</Button> :
            <Button
              style={{ color: '#1e90ff' }}
              onClick={() => { setOpenPrinted(!openPrinted); console.log(print); }}>
              Genereaza
            </Button>

        }
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

      <Modal
        open={openPrinted}
        onClose={() => setOpenPrinted(!openPrinted)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <PrintedTest discipline={tests.discipline} module={tests.module} grade={tests.grade} tests={print}/>
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
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};