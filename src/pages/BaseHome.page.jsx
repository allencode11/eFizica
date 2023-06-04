import Container from '@mui/material/Container';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    id: 1,
    image: require('../assets/informatics.png'),
    heading: 'Informatica',
    content: 'Accesează resursele disponibile pentru disciplina informatica',
    location: '/eInfo',
    name: 'info'
  },
  {
    id: 2,
    image: require('../assets/geometry.png'),
    heading: 'Matematica',
    content: 'Accesează resursele disponibile pentru disciplina matematica',
    location: '/eMath',
    name:'math'
  },
  {
    id: 3,
    image: require('../assets/magnet.png'),
    heading: 'Fizica',
    content: 'Accesează resursele disponibile pentru disciplina fizica',
    location: '/eFizica',
    name: 'fizica'
  }
]

export const BaseHomePage = () => {
  const navigate = useNavigate();
  return (
      <div style={{display: "flex", justifyContent: "center", marginLeft: "200px"}}>
        <Container sx={{ marginTop: 10}} maxWidth={'xl'}>
          <Grid container spacing={5}>
            {cards.map((card) => (
                <Grid item key={card.id} sm={3} >
                  <Card
                      sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                      onClick={() => navigate(card.location)}
                  >
                    <CardMedia
                        component="img"
                        image={card.image}
                        alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2" sx={{textAlign: 'center'}}>
                        { card.heading }
                      </Typography>
                      <Typography sx={{color: '#1e90ff', textAlign: 'center', fontSize: 15}}>
                        { card.content }
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Container>
      </div>
  );
}
