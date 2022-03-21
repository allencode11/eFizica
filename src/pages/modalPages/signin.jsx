import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { Input, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { auth } from '../../firebase/firebase.utils';

export const SignIn = ( props ) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Conectare
      </Typography>
      <FormControl fullWidth style={{ marginBottom: 20 }}>
        <TextField
            style={{ width: '100%', margin: 2}}
            id="standard-basic"
            label="email"
            onChange={handleEmail}
            variant="standard"/>
        <Input
          type="password"
            style={{ width: '100%', margin: 2}}
            id="standard-basic"
            label="password"
            onChange={handlePassword}
            variant="standard"/>

        <Button style={{marginTop: 5}} variant="contained" onClick={ async () => {
          try {
            await auth.signInWithEmailAndPassword(email, password);
            props.handleOpenSignIn(!props.open)
          } catch (e) {
            alert('Parola sau emailul nu este valid!')
          }
        }}>
          Conectează-mă
        </Button>
      </FormControl>
    </div>
  )
}