import { MathComponent } from 'mathjax-react';

export const FirstProblemItem = ({item}) => {
  const condition = item.condition[0].split('@');

  return (
    <div>
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
      {[
        ...Array(Number(item.condition[1])),
      ].map((value, index) => (
        <div style={{height: 25, paddingBottom: 15}} id={index + 1} key={index}/>
      ))
      }
    </div>
  )
}