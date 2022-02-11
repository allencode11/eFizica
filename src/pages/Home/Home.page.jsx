import Container from '@mui/material/Container';
import { Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    id: 1,
    image: 'https://toppng.com/uploads/preview/lanning-icon-you-will-ace-the-test-11563381838fmsgajkbay.png',
    heading: 'Teste',
    content: 'Genereaza un test',
    location: '/teste',
  },
  {
    id: 2,
    image: 'https://www.clipartmax.com/png/middle/357-3579630_energy-lab-lever-load-physics-pulley-work-icon-physics-lab-icon.png',
    heading: 'Laboratoare',
    content: 'Descarca laborator',
    location: '/lab',
  },
  {
    id: 3,
    image: 'https://png.pngtree.com/element_our/20200609/ourmid/pngtree-simple-table-border-image_2232100.jpg',
    heading: 'Tabele',
    content: 'Vizualizare tabele',
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
