export const CorrespondenceItem = ({item}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center', paddingLeft: 150}}>
      <div style={{width: '40%'}}>{item.condition[0].split(',').map( (variable) => (<div>{variable + '  -'}</div>))}</div>
      <div style={{width: '40%'}}>{item.condition[1].split(',').map( (unit) => (<div>{'-  ' + unit}</div>))}</div>
    </div>
  )
}