import MathJax from 'react-mathjax';

export const SecondProblemItem = ({item}) => {
  const condition = item.condition[0].split('@');
  return (
    <MathJax.Provider>
      <div style={{flexDirection: 'column'}}>
        <p>
          {
            condition.map((element, index) => index % 2 === 0 ? element: (<MathJax.Node inline formula={element} />))
          }
        </p>
        <img
          style={{width: `${item.condition[2]}`, height: 'auto', paddingBottom: 5, float: 'right', maxHeight: '350px'}} src={item.condition[1]}/>
        {[
          ...Array(Number(item.condition[3])),
        ].map((value, index) => (
          <div style={{height: 15}} id={index + 1} key={index}/>
        ))
        }
    </div>
    </MathJax.Provider>
  )
}