import { Container, Typography, Button, Card, CardContent, Modal } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { CreateQuestion } from '../../modalPages/createQuestion';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { deleteItem, getQuestion } from '../../../firebase/firebase.utils';
import { CompleteItem } from '../../../components/Items/Complete.component';
import { CorrespondenceItem } from '../../../components/Items/Correspondence.component';
import { FirstProblemItem } from '../../../components/Items/Problem1.component';
import { SecondProblemItem } from '../../../components/Items/Problem2.component';
import { BooleanItem } from '../../../components/Items/Boolean.component';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { UpdateQuestion } from '../../modalPages/updateQuestion';

const selectData = [
  {
    section: 'complete',
    items: 3,
    component: 'Complete',
  },
  {
    section: 'correspondence',
    items: 3,
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

export const MathTestPage = (props) => {
  const [tests, setTests] = useState({});
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState('7');
  const [module, setModule] = useState('Statica fluidelor');
  const [position, setPosition] = useState(0);
  const [print, setPrint] = useState({});
  const [openUpdate, setOpenUpdate] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  let sum = selectData[position].items;

  const addToPrint = (question) => {
    if (!(question.question.questionType in print)) {
      print[question.question.questionType] = [];
    }
    const index = print[question.question.questionType].findIndex((el) => el.uuid === question.uuid);

    if (index >= 0) {
      print[question.question.questionType].splice(index, 1);
    } else {
      print[question.question.questionType].push({
        ...question
      });
      setPrint({ ...print });
    }

    if(question.question.questionType === 'problem1')
    {
      if (print['problem1'].length == 2) {
        print['problem'] = [];
        print['problem'].push(print['problem1'][0]);
        print['problem1'].splice(0,1);
        setPrint({ ...print });
      }
    }

  }

  const handleGrade = async (event) => {
    setGrade(event.target.value);
  }

  const handleModule = async (event) => {
    setModule(event.target.value);
  }

  const handleOpenUpdate = async () => {
    setOpenUpdate(!openUpdate);
  }

  const fetchMyAPI = useCallback(async () => {
    const questions = await getQuestion(grade, module);

    const tep = []
    const temp = [...questions[0].questions]
    temp.forEach( question => tep.push({question, display: false, uuid: uuid()}));
    const data = { discipline:questions[0].discipline, grade: questions[0].grade, module: questions[0].module, questions: tep};
    setTests(data);
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
        {
          props.role === 'admin' && <Button style={{backgroundColor: '#1e90ff'}} onClick={() => setOpen(!open)} variant="contained">
            Creaza intrebare
          </Button>
        }
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', position: 'absolute'}}>
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

          <div style={{marginBottom: 10}}>
            {
              tests.questions &&
              tests.questions
              .filter(item => item.question.questionType === selectData[position].section)
              .map((element, index) => (
                <Card
                  key={index}
                  style={{
                    margin: '20px 0 0 0',
                    border: element.display ? '1px solid #1e90ff' : '1px solid #ccc',
                  }}>
                  <CardContent
                    style={{display: 'flex', flexDirection: 'row' }}
                    onClick={ () => {
                      if( element.question.questionType !== 'correspondence' ) {
                        addToPrint(element);
                        const index = tests.questions.findIndex((elem) => elem.uuid === element.uuid);
                        const newTests = tests;
                        newTests.questions[index].display = !element.display;
                         setTests({ ...newTests });
                      }
                    }}
                  >
                    <div style={{width: '97%'}}>
                      {
                        element.question.questionType === 'complete' ? (
                          <CompleteItem item={element.question}/>
                        ) : element.question.questionType === 'correspondence' ? (
                          <CorrespondenceItem onClick={(text) => {
                            element.question.condition[1] = text;
                            addToPrint(element);
                            const index = tests.questions.findIndex((elem) => elem.uuid === element.uuid);
                            const newTests = tests;
                            newTests.questions[index].display = !element.display;
                            setTests({ ...newTests });
                          }} title={element.question.condition[0]} variants={element.question.condition[1].split(',')}/>
                        ) : element.question.questionType === 'problem1' ? (
                          <FirstProblemItem item={element.question}/>
                        ) : element.question.questionType === 'problem2' ? (
                          <SecondProblemItem item={element.question}/>
                        ) : element.question.questionType === 'boolean' ? (
                          <BooleanItem item={element.question}/>
                        ) : null
                      }
                    </div>
                    {
                      element.display ? <img
                        src={require('../../../assets/done.png')}
                        style={{width: '3%', height: '4%'}}/> : null
                    }
                  </CardContent>
                  <div style={{display: 'flex', justifyContent: 'right', paddingBottom: 10}}>
                    {
                      props.role === 'admin' && <img
                        src={require('../../../assets/trash.png')}
                        style={{width: '3%', height: '4%', cursor: 'pointer'}}
                        onClick={async () => {
                          await deleteItem(tests.module, tests.grade, element.question.condition)
                        }
                        }/>
                    }
                    {
                      props.role === 'admin' && <img
                        src={require('../../../assets/edit.png')}
                        style={{width: '3%', height: '4%', cursor: 'pointer'}}
                        onClick={async () => {
                          handleOpenUpdate(!openUpdate);
                          setItemToUpdate(element.question);
                        }
                      }/>
                    }
                  </div>
                </Card>
              ))}
          </div>
        </div>
        <div>

        </div>
        {
          print[selectData[position].section] &&
            print[selectData[position].section].length === sum || print['problem']?.length === 1 ?
            <div style={{display: 'flex', flexDirection: 'column', position: 'fixed', right: '25px', top: '13%'}}>
              {
                position < selectData.length - 1 &&
                <Button
                  style={{
                    backgroundColor: '#1e90ff',
                    color: 'white',
                    marginTop: 10,
                    marginBottom: 10,
                    height: 36,
                  }}
                  onClick={() => {
                    if (position < selectData.length - 1) {
                      setPosition(position + 1)
                      sum += selectData[position].items
                    }
                  }}>
                  Urmatorul
                </Button>
              }
              {
                [selectData.length - 1, selectData.length - 2, 1].includes(position) &&
                  <Link
                    style={{
                      backgroundColor: '#1e90ff',
                      color:'white',
                      marginTop: 10,
                      marginBottom: 10,
                      height: 40,
                      padding: 10,
                      borderRadius: 5,
                      fontWeight: 500
                    }}
                    discipline={tests.discipline}
                    params={{
                      print,
                    }}
                    module={tests.module}
                    grade={tests.grade}
                    tests={print}
                    onClick={() => {
                      console.log('print', print)
                      localStorage.removeItem("selected");
                      localStorage.removeItem("testData");
                      localStorage.setItem("selected", JSON.stringify(print));
                      localStorage.setItem("testData", JSON.stringify({ discipline: tests.discipline, module: tests.module, grade: tests.grade }));
                    }}
                    to={{
                      pathname: '/eMath/printedTest',
                    }}>
                    GENEREAZA</Link>
              }
            </div> : null
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
          <Button
            style={{marginTop: 5, width: '100%'}} variant="contained"
            onClick={() => setOpen(!open)} variant="contained">
            Finish
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openUpdate}
        onClose={() => handleOpenUpdate()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <UpdateQuestion item={itemToUpdate} changeState={handleOpenUpdate} grade={grade} module={module}/>
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
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};