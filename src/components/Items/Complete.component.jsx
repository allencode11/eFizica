import Typography from '@mui/material/Typography';

export const CompleteItem = ({item}) => {
  return (
    <div style={{paddingBottom: 5 }}>{ item.condition.replaceAll('%', '________________ ') }</div>
  )
}