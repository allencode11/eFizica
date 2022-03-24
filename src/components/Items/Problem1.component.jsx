export const FirstProblemItem = ({item}) => {
  return (
    <div>
      <div>{item.condition[0]}</div>
      {[
        ...Array(Number(item.condition[1])),
      ].map((value, index) => (
        <div style={{height: 25, paddingBottom: 15}} id={index + 1} key={index}/>
      ))
      }
    </div>
  )
}