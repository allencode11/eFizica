export const CompleteItem = ({item}) => {
  return (
    <div>{ item.condition.replaceAll('%', '________________ ') }</div>
  )
}