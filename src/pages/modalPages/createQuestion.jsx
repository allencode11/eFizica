import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

export const CreateQuestion = () => {
  const [questionType, setQuestionType] = useState(null);
  const [grade, setGrade] = useState(null);
  const [variables, setVariables] = useState(null);
  const [units, setUnits] = useState(null);
  const [condition, setCondition] = useState(null);
  const [image, setImage] = useState(null);

  const changeQuestionType = (event) => {
    setQuestionType(event.target.value);
  };
  const handleChangeGrade = (event) => {
    setGrade(event.target.value);
  };
  const handleChangeCondition = (event) => {
    setCondition(event.target.value);
  };
  const handleChangeImage = (event) => {
    setImage(event.target.value);
  };
  const handleChangeUnits = (event) => {
    setUnits(event.target.value);
  };

  return (
    <div>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Creaza o intrebare
      </Typography>
      <FormControl fullWidth style={{ marginBottom: 20 }}>
        <InputLabel id="demo-simple-select-label">Type </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={questionType}
          label="Type"
          onChange={changeQuestionType}
        >
          <MenuItem value={'boolean'}>boolean</MenuItem>
          <MenuItem value={'complete'}>complete</MenuItem>
          <MenuItem value={'correspondence'}>correspondence</MenuItem>
          <MenuItem value={'problem1'}>problem1</MenuItem>
          <MenuItem value={'problem2'}>problem2</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Grade</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={grade}
          label="Grade"
          onChange={handleChangeGrade}
        >
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
        {
          questionType === 'problem2' ? (
            <div>
              <TextField
                style={{ width: '100%', margin: 2}}
                onChange={handleChangeCondition}
                id="standard-basic"
                label="condition"
                variant="standard" />

              <TextField
                style={{ width: '100%', margin: 2}}
                id="standard-basic"
                label="image"
                variant="standard" />
            </div>
          ) : questionType === 'correspondence' ? (
            <div>
              <TextField
                style={{ width: '100%', margin: 2}}
                id="standard-basic"
                label="variables"
                onChange={handleChangeImage}
                variant="standard"/>

              <TextField
                style={{ width: '100%', margin: 2}}
                onChange={handleChangeUnits}
                id="standard-basic"
                label="units"
                variant="standard" />
            </div>
          ) : (
            <TextField
              style={{ width: '100%', margin: 2 }}
              onChange={handleChangeCondition}
              id="standard-basic"
              label="sentence"
              variant="standard" />
          )
        }
      </FormControl>
    </div>
  )
}