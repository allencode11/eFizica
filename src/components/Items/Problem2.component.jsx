import { MathComponent } from 'mathjax-react';

export const SecondProblemItem = ({item}) => {
  const condition = item.condition[0].split('@').filter(element => element != '');
  return (
    <div style={{flexDirection: 'column'}}>
      {
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
          {
          condition.map((element, index) => (
            <div>
              {
                index % 2 === 0 ?
                  <span style={{margin: 3}}> {element} </span> :
                  <span style={{ width: 0, backgroundColor: 'red', display: 'inline-block'}}>
                    <MathComponent tex={element}/>
                  </span>
              }
            </div>
          ))}
        </div>
      }
      <img
        style={{width: `${item.condition[2]}`, display: 'flex', flexDirection: 'row', alignItems:'right', height: 'auto', paddingBottom: 5}} src={item.condition[1]}/>
      {[
        ...Array(Number(item.condition[3])),
      ].map((value, index) => (
        <div style={{height: 15}} id={index + 1} key={index}/>
      ))
      }
    </div>
  )
}