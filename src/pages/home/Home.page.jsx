import Container from '@mui/material/Container';
import { Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
    content: 'Vizualizare plănuirea calendaristică',
    location: '/eFizica/plan',
  }
]

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ py: 10}} maxWidth="md">
      <Grid container spacing={5}>
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="img"
                image={card.image}
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  { card.heading }
                </Typography>
                <Typography>
                  { card.content }
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" sx={{color: '#1e90ff'}} onClick={() => navigate(card.location)}>Acceseaza</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
