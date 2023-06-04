import Container from '@mui/material/Container';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    id: 1,
    image: require('../../assets/test.png'),
    heading: 'Teste',
    content: 'Alcătuiește și descarcă un test de evaluare',
    location: '/eFizica/tests',
  },
  {
    id: 2,
    image: require('../../assets/labs.png'),
    heading: 'Lucrări de laborator',
    content: 'Vizualizează și descarcă lucrările de laborator dorite',
    location: '/eFizica/lab',
  },
  {
    id: 3,
    image: require('../../assets/table.png'),
    heading: 'Tabele',
    content: 'Vizualizează și descarcă tabele necesare',
    location: '/eFizica/tables',
  },
  {
    id: 4,
    image: require('../../assets/calendar.png'),
    heading: 'Calendar școlar',
    content: 'Vizualizează calendarul pentru anul școlar curent',
    location: '/eFizica/calendar',
  },
  {
    id: 5,
    image: require('../../assets/proiectare.png'),
    heading: 'Plănuire',
    content: 'Vizualizare și descare plănuire calendaristică',
    location: '/eFizica/plan',
  }
]

export const InfoHomePage = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ marginTop: 10 }} maxWidth={'xl'}>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item key={card.id} sm={2.4} >
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
  );
}
