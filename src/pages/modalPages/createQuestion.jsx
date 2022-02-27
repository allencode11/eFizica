import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Input, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createQuestion } from '../../firebase/firebase.utils';

export const CreateQuestion = () => {
  const [open, setopen] = useState(true);
  const [questionType, setQuestionType] = useState(null);
  const [grade, setGrade] = useState(null);
  const [units, setUnits] = useState(null);
  const [lines, setLines] = useState(null);
  const [condition, setCondition] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [module, setModule] = useState(null);
  const [size, setSize] = useState(null);
  const [s1, setS1] = useState(null);
  const [s2, setS2] = useState(null);
  const [s3, setS3] = useState(null);
  const [s4, setS4] = useState(null);

  const changeQuestionType = (event) => {
    setQuestionType(event.target.value);
  };
  const handleSize = (event) => {
    setSize(event.target.value);
  };
  const handleLines = (event) => {
    setLines(event.target.value);
  };
  const handleChangeGrade = (event) => {
    setGrade(event.target.value);
  };
  const handleChangeModule = (event) => {
    setModule(event.target.value);
  };
  const handleChangeCondition = (event) => {
    setCondition(event.target.value);
  };
  const handleChangeImageUrl = (event) => {
    setImageUrl(event.target.value);
  };
  const handleChangeUnits = (event) => {
    setUnits(event.target.value);
  };

  return (
    <div>
      <Typography style={{color: '#1e90ff', marginBottom: 10}} id="modal-modal-title" variant="h6" component="h2">
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
      <FormControl fullWidth style={{ marginBottom: 20 }}>
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
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Module</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={module}
          label="Module"
          onChange={handleChangeModule}
        >
          <MenuItem value={'Mișcarea și repausul'}>Mișcarea și repausul</MenuItem>
          <MenuItem value={'Interacțiuni'}>Interacțiuni</MenuItem>
          <MenuItem value={'Statica fluidelor'}>Statica fluidelor</MenuItem>
          <MenuItem value={'Lucrul mecanic, puterea si energia mecanica'}>Lucrul mecanic, puterea și energia mecanică</MenuItem>
          <MenuItem value={'Echilibrul de rotație'}>Echilibrul de rotație</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
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
                style={{ width: '100%', margin: 2 }}
                onChange={handleLines}
                id="standard-basic"
                label="lines"
                variant="standard" />

              <TextField
                style={{ width: '100%', margin: 2}}
                onChange={handleSize}
                id="standard-basic"
                label="image width"
                variant="standard" />

              <label htmlFor="contained-button-file">
                <Input onChange={handleChangeImageUrl}
                       style={{ width: '100%', margin: 2}}
                       accept="image/*"
                       id="contained-button-file"
                       multiple type="file"
                />
              </label>
            </div>
          ) : questionType === 'correspondence' ? (
            <div>
              <TextField
                style={{ width: '100%', margin: 2}}
                id="standard-basic"
                label="variables"
                onChange={handleChangeCondition}
                variant="standard"/>

              <TextField
                style={{ width: '100%', margin: 2}}
                onChange={handleChangeUnits}
                id="standard-basic"
                label="units"
                variant="standard" />
            </div>
          ) : questionType === 'problem1' ? (
            <div>
              <TextField
                style={{ width: '100%', margin: 2 }}
                onChange={handleChangeCondition}
                id="standard-basic"
                label="sentence"
                variant="standard" />
              <TextField
                style={{ width: '100%', margin: 2 }}
                onChange={handleLines}
                id="standard-basic"
                label="lines"
                variant="standard" />
            </div>
          ) : (
              <TextField
                style={{ width: '100%', margin: 2 }}
                onChange={handleChangeCondition}
                id="standard-basic"
                label="sentence number one"
                variant="standard" />
          )
        }
        <Button style={{marginTop: 5}} variant="contained" onClick={ async () => {

          switch (questionType) {
            case 'complete':
             await createQuestion( grade, module, {questionType, condition: condition });
             alert('Item was added');
              break;
            case 'problem1':
              await createQuestion( grade, module, {questionType, condition: [ condition, lines ]});
              alert('Item was added');
              break;
            case 'problem2':
              await createQuestion( grade, module, {questionType, condition: [ condition, imageUrl, size, lines ]});
              alert('Item was added');
              break;
            case 'correspondence':
              await createQuestion( grade, module, {questionType, condition: [ condition, units]});
              alert('Item was added');
              break;
            case 'boolean':
              await createQuestion( grade, module, {questionType, condition: condition });
              alert('Item was added');
              break;
          };
        }}>
          Add to db
        </Button>
      </FormControl>
    </div>
  )
}