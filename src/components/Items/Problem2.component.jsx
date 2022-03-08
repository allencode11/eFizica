export const SecondProblemItem = ({item}) => {
  return (
    <div style={{flexDirection: 'column'}}>
      <div>{item.condition[0]}</div>
      <img style={{width: `${item.condition[2]}`, height: 'auto'}} src={item.condition[1]}/>
      {[
        ...Array(Number(item.condition[3])),
      ].map((value, index) => (
        <div style={{height: 15}} id={index + 1} key={index}/>
      ))
      }
    </div>
  )
}