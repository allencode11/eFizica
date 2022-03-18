import { ImageList, ImageListItem, ImageListItemBar, ListSubheader, Modal } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { message, Upload } from 'antd';
import Button from '@mui/material/Button';
import { createTable, getTable } from '../../firebase/firebase.tables.data';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Grid, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SignIn } from '../modalPages/signin';

export const TablesPage = () => {
  const [image, setImage] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState(null);
  const [open, setOpen] = useState(false);
  const [element, setElement] = useState('');

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
    setImageTitle(img.name);
  };

  const beforeUpload = (file) => {
    setLoading(true)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
  };

  const fetchMyAPI = useCallback(async () => {
    let tables = await getTable();
    setTables(tables);
  }, []);

  useEffect( () => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  const onChangeImage = ( info ) => {
    getBase64(info.file.originFileObj, (imageUrl )=> {
      setImage(imageUrl);
      setLoading(false)
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Grid container spacing={2} style={{ marginTop: 5, marginLeft: 5}}>
        {
          tables ? tables.image.map((item) => (
          <Grid item xs={3}>
            <Card
              style={{ width: '97%',marginTop: 10, cursor: 'pointer', marginBottom: 10 }}
              onClick={() => {
                setOpen(true);
                setElement(item);
              }}
            >
              <img
                src={item.file.imageUrl}
                style={{ width: '94%', height: 405, margin: 15, borderRadius: 15}}
                alt={item.file.title.substring(0, item.file.title.length-3)}
                loading="lazy"
              />
              <Typography style={{ color: '#1e90ff', textAlign: 'center', marginBottom: 10, fontSize: 14}}>
                { item.file.title.substring(0, item.file.title.length-4) }
              </Typography>
            </Card>
          </Grid>
        ))
        : null
        }
      <Upload
        sx={{ marginTop: '5%'}}
        name="image"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={() => null}
        onChange={onChangeImage}
      >
        {image ? <img src={image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      {image ? <Button onClick={ async () => {
        await createTable({ discipline: 'physics', imageUrl: image, title: imageTitle });
      }}>Add</Button> : null}
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        { element &&
          <img
            src={element.file.imageUrl}
            style={modalstyle}
            alt='{item.file.title}'
            loading="lazy"
          />
        }
      </Modal>
    </Grid>
  )
}

const modalstyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  modalStyle: 'auto',
  width: 'auto',
  maxHeight: '90%',
  paddingTop: 10,
  paddingBottom: 10,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};