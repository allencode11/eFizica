import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createQuestion, updateItem } from '../../firebase/firebase.utils';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import 'antd/dist/antd.css';

export const UpdateQuestion = (props) => {
  const [questionType, setQuestionType] = useState(props.item.questionType);
  const [variable, setVariable] = useState(props.item.condition[0]);
  const [units, setUnits] = useState(props.item.condition[1]);
  const [lines, setLines] = useState(props.item.condition[3]);
  const [condition, setCondition] = useState(props.item.condition);
  const [imageUrl, setImageUrl] = useState(null);
  const [size, setSize] = useState(props.item.condition[2]);
  const [loading, setLoading] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    setLoading(true)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
  };
  const onChangeImage = ( info ) => {
    getBase64(info.file.originFileObj, imageUrl => {
      setImageUrl(imageUrl);
      setLoading(false)
    });
  };

  const changeQuestionType = (event) => {
    setQuestionType(event.target.value);
  };
  const handleSize = (event) => {
    setSize(event.target.value);
  };
  const handleLines = (event) => {
    setLines(event.target.value);
  };

  const handleChangeCondition = (event) => {
    setCondition(event.target.value);
  };
  const handleChangeUnits = (event) => {
    setUnits(event.target.value);
  };
  const handleChangeVariable = (event) => {
    setVariable(event.target.value);
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
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
        {
          questionType === 'problem2' ? (
            <div>
              <TextField
                style={{ width: '100%', margin: 2}}
                onChange={handleChangeCondition}
                value={condition[0]}
                id="standard-basic"
                label="condition"
                variant="standard" />

              <TextField
                style={{ width: '100%', margin: 2 }}
                onChange={handleLines}
                value={lines}
                id="standard-basic"
                label="lines"
                variant="standard" />

              <TextField
                style={{ width: '100%', margin: 2}}
                onChange={handleSize}
                value={size}
                id="standard-basic"
                label="image width"
                variant="standard" />

              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={() => null}
                onChange={onChangeImage}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </div>
          ) : questionType === 'correspondence' ? (
            <div>
              <TextField
                style={{ width: '100%', margin: 2}}
                id="standard-basic"
                label="variables"
                value={variable}
                onChange={handleChangeCondition}
                variant="standard"/>

              <TextField
                style={{ width: '100%', margin: 2}}
                onChange={handleChangeUnits}
                value={units}
                id="standard-basic"
                label="units"
                variant="standard" />
            </div>
          ) : questionType === 'problem1' ? (
            <div>
              <TextField
                style={{ width: '100%', margin: 2 }}
                onChange={handleChangeCondition}
                value={condition[0]}
                id="standard-basic"
                label="sentence"
                variant="standard" />
              <TextField
                style={{ width: '100%', margin: 2 }}
                onChange={handleLines}
                value={condition[1]}
                id="standard-basic"
                label="lines"
                variant="standard" />
            </div>
          ) : (
              <TextField
                style={{ width: '100%', margin: 2 }}
                onChange={handleChangeCondition}
                value={condition}
                id="standard-basic"
                label="sentence number one"
                variant="standard" />
          )
        }
        <Button style={{marginTop: 5}} variant="contained" onClick={ async () => {
          console.log(props.item)
          switch (questionType) {
            case 'complete':
             await updateItem( props.item.condition, {category: questionType, condition: condition }, props.module, props.grade);
             alert('Item was updated');
              break;
            case 'problem1':
              await updateItem( {category: questionType, condition: [ condition, lines ]});
              alert('Item was added');
              break;
            case 'problem2':
              await updateItem( {category: questionType, condition: [ condition, imageUrl, size, lines ]});
              alert('Item was added');
              break;
            case 'correspondence':
              await updateItem( {category: questionType, condition: [ condition, units]});
              alert('Item was added');
              break;
            case 'boolean':
              await updateItem( {category: questionType, condition: condition });
              alert('Item was added');
              break;
          };
          props.changeState();
        }}>
          Modifica
        </Button>
      </FormControl>
    </div>
  )
}