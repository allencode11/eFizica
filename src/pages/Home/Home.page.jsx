import Container from '@mui/material/Container';
import { Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    id: 1,
    image: 'https://source.unsplash.com/random',
    heading: 'Teste',
    content: 'Lorem ipsum prof de fizica',
    location: '/teste',
  },
  {
    id: 2,
    image: 'https://source.unsplash.com/random',
    heading: 'Laboratoare',
    content: 'Lorem ipsum prof de fizica',
    location: '/lab',
  },
  {
    id: 3,
    image: 'https://source.unsplash.com/random',
    heading: 'Tabele',
    content: 'Lorem ipsum prof de fizica',
    location: '/info',
  }
]

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
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
                <Button size="small" onClick={() => navigate(card.location)}>Acceseaza</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
