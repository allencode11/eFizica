import { Container, Typography } from '@mui/material';
import { useState } from 'react';
import { TestData } from '../testPage/data';
import { Conditions } from './conditions';

export const PrintedTest = () => {
  const [test, setTest] = useState(TestData);
  const [conditions, setConditions] = useState(Conditions);

  return (
    <Container maxWidth="md">
      <div style={{
        margin: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography> Disciplina: {test[0].discipline}</Typography>
        <Typography> Data: ____________</Typography>
        <Typography> Clasa a {test[0].class}</Typography>
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
        <Typography> Unitatea: {test[0].module}</Typography>
      </div>

      <div style={{
        border: '2px solid black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
      }}>
        <Typography sx={{
          width: 15,
          textAlign: 'center',
          padding: 1.5,
          borderRight: '2px solid black',
          paddingTop: 0.5,
          paddingBottom: 0.5,
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
        test[0].questions.map( question => {
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
              }}>1.</Typography>

              <Typography sx={{
                width: 727,
                textAlign: 'left',
                padding: 1.5,
                borderBottom: '2px solid black'
              }}>

                <div>{
                    conditions.filter(ruleElement => ruleElement.name === 'complete').map(item => (
                      <Typography style={{fontWeight: 'bold'}}>{item.rule}</Typography>
                    ))}
                </div>
                {
                question.type === 'complete' ? (
                  <div>
                    { question.content.map( (element) => (<div>{element.replaceAll('%', '________________ ')}</div>))}</div>
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
        Enache Alic  :   https://allencode11.github.io/eFizica.io/
      </Typography>
    </Container>
  )
}

const cell = {
  border: '2px solid black',
  width: 150,
}