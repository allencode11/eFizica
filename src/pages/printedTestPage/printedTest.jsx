import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Conditions } from './conditions';
import { CompleteItem } from '../../components/Items/Complete.component';
import { CorrespondenceItem } from '../../components/Items/Correspondence.component';
import { FirstProblemItem } from '../../components/Items/Problem1.component';
import { SecondProblemItem } from '../../components/Items/Problem2.component';
import { BooleanItem } from '../../components/Items/Boolean.component';

export const PrintedTest = (props) => {
  const tests = JSON.parse(localStorage.getItem("selected")) || props.tests;
  const testData = JSON.parse(localStorage.getItem("testData")) || props.tests;
  const [conditions, setConditions] = useState(Conditions);
  let questionCount = 1;
  const points = Object.keys(tests).length === 2 ? 6 : Object.keys(tests).length === 5 ? 17 : 25;

  const randomise = (qArr) => {
    if (qArr[0].question.questionType === 'correspondence') {
      const randomIndexes = [...Array(qArr.length).keys()]
        .sort((a, b) => 0.3 - Math.random());
      console.log(randomIndexes, 'random');

      if(randomIndexes == [0, 1, 2]) {
        randomise(qArr);
      } else {
        const tmpArr = qArr.map((el) => ({...el, question: {...el.question, condition: [...el.question.condition] } }));

        for (let i = 0; i < qArr.length; i++) {
          qArr[i].question.condition[1] = tmpArr[randomIndexes[i]].question.condition[1];
        }
      }
    }

    return qArr;
  }

  const simulateKeypress = () => {
    window.print();
  }
  return (
    <Container maxWidth="md"  style={{marginBottom: 20}}>
       { /*Datele generale despre test*/ }
      <div style={{
        margin: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography> Disciplina: { testData.discipline } </Typography>
        <Typography> Clasa: { testData.grade } </Typography>
      </div>
      <div style={{
        margin: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography> Nume, prenume elev: _________________</Typography>
        <Typography> Punctaj acumulat: ____</Typography>
        <Typography> Nota: ___</Typography>
        <Typography> Punctaj total: {points}</Typography>

      </div>
      <div style={{
        margin: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'red',
        paddingLeft: 50,
        paddingRight: 60,
      }}>
        <Typography> Nume, prenume profesor: ___________________</Typography>
        <Typography> Semnatura: ________________</Typography>
      </div>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}>
        <Typography> Unitatea: { testData.module } </Typography>
      </div>

      <Container style={{
        display: 'flex',
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
      }}>
        <Typography
          sx={{
            width: 48,
            textAlign: 'center',
            padding: 1.6,
            paddingTop: 0.5,
            paddingBottom: 0.5,
            border: '2px solid black',
          }}
        >
          Nr.
        </Typography>

        <Typography
          sx={{
            width: 754,
            textAlign: 'center',
            padding: 0.5,
            borderRight: '2px solid black',
            borderBottom: '2px solid black',
            borderTop: '2px solid black'
          }}
        >
          Item
        </Typography>

        <Typography
          sx={{
            width: 50,
            textAlign: 'center',
            padding: 1,
            paddingTop: 0.5,
            paddingBottom: 0.5,
            borderRight: '2px solid black',
            borderBottom: '2px solid black',
            borderTop: '2px solid black'
          }}
        >
          Scor
        </Typography>
      </Container>
      {
        Object.keys(tests) &&
        Object.keys(tests).map((key) => (
          <div key={key} style={{
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography
              sx={{
                width: 51,
                textAlign: 'center',
                padding: 1.5,
                borderRight: '2px solid black',
                borderBottom: '2px solid black',
                borderLeft: '2px solid black'
              }}
            >
              {questionCount++}
            </Typography>

            <Container sx={{
              width: '100%',
              textAlign: 'left',
              padding: 1.5,
              borderBottom: '2px solid black',
            }}>
              <div>
                {
                  conditions
                    .filter(ruleElement => ruleElement.name === tests[key][0].question.questionType)
                    .map(item => (
                      <Typography key={item.rule} style={{ fontWeight: 'bold', paddingBottom: 5 }}>
                        {item.rule}
                      </Typography>
                    ))
                }
              </div>
              {
                randomise(tests[key]).map((el, index) => {
                  return el.question.questionType === 'complete' ? (
                    <CompleteItem key={index} style={{ marginBottom: 20}} item={el.question}/>
                  ) : el.question.questionType === 'correspondence' ? (
                    <CorrespondenceItem key={index}
                                        style={{ marginBottom: 10 }}
                                        title={el.question.condition[0]}
                                        variants={el.question.condition[1].split(',')}
                    />
                  ) : el.question.questionType === 'problem1' ? (
                        <FirstProblemItem key={index} style={{ marginBottom: 20, border: '1px solid #cc'}} item={el.question}/>
                  ) : el.question.questionType === 'problem2' ? (
                    <SecondProblemItem key={index} style={{ marginBottom: 20 }} item={el.question}/>
                  ) : el.question.questionType === 'boolean' ? (
                    <BooleanItem key={index} style={{ marginBottom: 20 }} item={el.question}/>
                  ) : el.question.questionType === 'problem1' ? (
                      <FirstProblemItem key={index} style={{ marginBottom: 20, border: '1px solid #cc'}} item={el.question}/>
                  ) : null
                })
              }
            </Container>
            <Container sx={{
              width: 51,
              textAlign: 'center',
              padding: 1.5,
              borderRight: '2px solid black',
              borderBottom: '2px solid black',
              borderLeft: '2px solid black'
            }}>

              <Typography>L</Typography>
              {
                conditions
                  .filter(ruleElement => ruleElement.name === tests[key][0].question.questionType)
                  .map(item => {
                    const components = [];
                    for (let i = 0; i <= item.points; i++) {
                       components.push((
                        <Typography>{i}</Typography>
                      ))
                    }
                    return components
                  })
              }
            </Container>
          </div>
        ))
      }
    </Container>
  )
}
