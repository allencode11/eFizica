export const CompleteItem = ({item}) => {
  return (
    <div style={{paddingBottom: 5 }}>{ item.condition.replaceAll('%', '________________ ') }</div>
  )
}