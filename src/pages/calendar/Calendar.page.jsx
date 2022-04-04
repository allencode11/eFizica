import React, { useCallback, useEffect, useState } from 'react';
import { createCalendar, getCalendar } from '../../firebase/firebase.calendar.data';
import { message, Upload } from 'antd';
import { Card, Modal } from '@mui/material';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';

export const CalendarPage = (props) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calendars, setCalendars] = useState(null);
  const [element, setElement] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchMyAPI = useCallback(async () => {
    let calendars = await getCalendar();
    setCalendars(calendars);
  }, []);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
      setImage(imageUrl);
      setLoading(false)
    });
  };

  useEffect( () => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return (
    <div style={{ paddingTop: '2%', paddingLeft: '2%', justifyContent: 'center'}}>
      { calendars ?
        calendars.image.map((calendar, index) => (
          <Card
            key={index}
            style={{width: '98%', marginTop: 20, cursor: 'pointer'}}
            onClick={() => {
              setOpen(!open);
              setElement(calendar);
            }}
          >
            <img style={{width: '98%', borderRadius: 15}} src={calendar.file} />
          </Card>
        ))
        : null
      }
      {
        props.role === 'admin' && <Upload
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
      }
      {image ? <Button onClick={ async () => {
        await createCalendar(image);
      }}>Adaugare</Button> : null}
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        { element &&
          <img
            src={element.file}
            style={modalstyle}
            alt='{item.file.title}'
            loading="lazy"
          />
        }
      </Modal>
    </div>

  )
};

const modalstyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  modalStyle: 'auto',
  width: 800,
  paddingTop: 10,
  paddingBottom: 10,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};