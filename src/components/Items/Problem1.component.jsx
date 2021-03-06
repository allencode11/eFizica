import MathJax from 'react-mathjax';

export const FirstProblemItem = ({item}) => {
  const condition = item.condition[0].split('@');

  return (
    <MathJax.Provider>
      <div>
        <p>
          {
            condition.map((element, index) => index % 2 === 0 ? element: (<MathJax.Node key={index} inline formula={element} />))
          }
        </p>
        {
          [
            ...Array(Number(item.condition[1])),
          ].map((value, index) => (
            <div key={index} style={{height: 25, paddingBottom: 15}} id={index + 1} key={index}/>
          ))
        }
      </div>
    </MathJax.Provider>
  )
}