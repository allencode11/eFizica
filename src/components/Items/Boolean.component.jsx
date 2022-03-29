

export const BooleanItem = ({item}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', paddingBottom: 10}}>
      <div style={{width: '90%'}}>{item.condition}</div>
      <div style={{width: '10%', textAlign: 'center'}}> A  F </div>
    </div>
  )
}
