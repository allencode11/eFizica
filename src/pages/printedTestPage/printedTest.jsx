import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Conditions } from './conditions';
import { CompleteItem } from '../../components/Items/Complete.component';
import { CorrespondenceItem } from '../../components/Items/Correspondence.component';
import { FirstProblemItem } from '../../components/Items/Problem1.component';
import { SecondProblemItem } from '../../components/Items/Problem2.component';
import { BooleanItem } from '../../components/Items/Boolean.component';

export const PrintedTest = ( discipline, grade, module, tests ) => {
  const [conditions, setConditions] = useState(Conditions);

  return (
    <Container maxWidth="md" onClick={() => { console.log('props', tests) }}>
       { /*Datele generale despre test*/ }

      <div style={{
        margin: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography> Disciplina: { discipline } </Typography>
        <Typography> Clasa: { grade } </Typography>
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
        <Typography> Punctaj total: 25</Typography>
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
      }}>
        <Typography> Unitatea: { module } </Typography>
      </div>

      { /*Crearea headerului tabelului*/ }
      <div style={{
        border: '2px solid black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
      }}>
        <Typography sx={{
          width: 51,
          textAlign: 'center',
          padding: 1.5,
          paddingTop: 0.5,
          paddingBottom: 0.5,
          borderRight: '2px solid black'
        }}>Nr.</Typography>
        <Typography sx={{
          width: 727,
          textAlign: 'center',
          padding: 1.5,
          paddingTop: 0.5,
          paddingBottom: 0.5,
        }}>Item</Typography>
        <Typography style={{
          width: 51,
          textAlign: 'center',
          padding: 1.5,
          paddingTop: 0.5,
          paddingBottom: 0.5,
          borderLeft: '2px solid black'
        }}>Scor</Typography>
      </div>

      {
        tests.questions &&
        tests.map((question, index) => {
          return (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              textAlign: 'center',
              justifyContent: 'space-between'
            }}>
              <Typography sx={{
                width: 15,
                textAlign: 'center',
                padding: 1.5,
                borderRight: '2px solid black',
                borderBottom: '2px solid black',
                borderLeft: '2px solid black',
              }}>{index + 1}</Typography>

              <Typography sx={{
                width: 727,
                textAlign: 'left',
                padding: 1.5,
                borderBottom: '2px solid black'
              }}>

                <div>{
                    conditions.filter(ruleElement => ruleElement.name === question.questionType).map(item => (
                      <Typography style={{fontWeight: 'bold'}}>{item.rule}</Typography>
                    ))}
                </div>
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
              <Typography sx={{
                width: 30,
                textAlign: 'center',
                padding: 1.5,
                borderRight: '2px solid black',
                borderBottom: '2px solid black',
                borderLeft: '2px solid black',
              }}>
                <div>L</div>
                <div>0</div>
                <div>1</div>
                <div>3</div>
              </Typography>
            </div>
          )
        })
      }
      <Typography sx={{color: 'grey', fontSize: 10, margin: 2, textAlign: 'center'}}>
        Enache Alic  :   https://allencode11.github.io/eFizica
      </Typography>
    </Container>
  )
}
