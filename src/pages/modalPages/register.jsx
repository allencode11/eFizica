import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Input, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {createUserAccountDocument} from "../../firebase/firebase.utils";

export const Register = () => {
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [institution, setInstitution] = useState(null);

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleSurname = (event) => {
    setSurname(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleInstitution = (event) => {
    setInstitution(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Creaza un cont
      </Typography>
      <FormControl fullWidth style={{ marginBottom: 20 }}>
        <TextField
            style={{ width: '100%', margin: 2}}
            id="standard-basic"
            label="name"
            onChange={handleName}
            variant="standard"/>
        <TextField
            style={{ width: '100%', margin: 2}}
            id="standard-basic"
            label="surname"
            onChange={handleSurname}
            variant="standard"/>
        <TextField
            style={{ width: '100%', margin: 2}}
            id="standard-basic"
            label="email"
            onChange={handleEmail}
            variant="standard"/>
        <TextField
            style={{ width: '100%', margin: 2}}
            id="standard-basic"
            label="institution"
            onChange={handleInstitution}
            variant="standard"/>
        <TextField
            style={{ width: '100%', margin: 2}}
            id="standard-basic"
            label="password"
            onChange={handlePassword}
            variant="standard"/>

        <Button style={{marginTop: 5}} variant="contained" onClick={ async () => {
          await createUserAccountDocument({email, name, surname, institution, password})

        }}>
          Submit
        </Button>
      </FormControl>
    </div>
  )
}