import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import {Register} from "../../pages/modalPages/register";
import {Modal} from "@mui/material";
import { auth } from '../../firebase/firebase.utils';
import { SignIn } from '../../pages/modalPages/signin';

const pages = [
  {
    name: 'Teste',
    location: '/eFizica/tests'
  },
  {
    name: 'Laboratoare',
    location: '/eFizica/lab'
  },
  {
    name: 'Tabele',
    location: '/eFizica/tables'
  },
];

export const Header = ({ currentUser }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e90ff'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link style={{ color: 'white' }} to={"/eFizica"}>eFizica</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{ color: 'black' }} to={page.location}>{page.name}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link style={{ color: 'white' }} to={"/"}>eFizica</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link style={{ color: 'white' }} to={page.location}>{page.name}</Link>
              </Button>
            ))}
            <div style={{position: "absolute", top: 15, right: 5}}>
              {
                currentUser ? (
                  <div>
                    <Button style={{color: 'white'}} onClick={() => auth.signOut()}>Sign out</Button>
                  </div>
                ) : (
                  <div>
                    <Button style={{color: 'white'}} onClick={() => setOpenSignIn(!openSignIn)}>Sign in</Button>
                    <Button style={{color: 'white'}} onClick={ () => {
                      setOpen(!open);
                    }}>Sign up</Button>
                  </div>
                )
              }
            </div>
          </Box>
        </Toolbar>
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalstyle}>
            <Register />
            <Button
            style={{backgroundColor: '#1e90ff', width: '100%',  color: 'white'}}
            onClick={ () => setOpen(!open)}>Finish</Button>

          </Box>
        </Modal>

        <Modal
          open={openSignIn}
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalstyle}>
            <SignIn />
            <Button
              style={{backgroundColor: '#1e90ff', width: '100%',  color: 'white'}}
              onClick={() => setOpenSignIn(!openSignIn)}>Finish</Button>
          </Box>
        </Modal>
      </Container>
    </AppBar>
  );
}

const modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};