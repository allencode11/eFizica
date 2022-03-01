import { useCallback, useEffect, useState } from 'react';
import { createCalendar, getCalendar } from '../../firebase/firebase.calendar.data';
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';

export const CalendarPage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calendars, setCalendars] = useState(null);

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
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
  };

  const onChangeImage = ( info ) => {
    console.log(info)
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setImage(imageUrl);
        setLoading(false)
      });
    }
  };

  useEffect( () => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return (
    <div style={{ paddingTop: '2%', paddingLeft: '2%', justifyContent: 'center'}}>
      { calendars ?
        calendars.image.map(calendar => (
          <div>
            <img style={{width: '98%', margin: 5, borderRadius: 15}} src={calendar.file} />
          </div>
        ))
        : null
      }
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={onChangeImage}
        style={{width: '80%', display:'flex', flexDirection: 'column', justifyContent: 'space-between'}}
      >
        {image ? <img src={image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      {image ? <Button onClick={ async () => {
        await createCalendar(image);
      }}>Add</Button> : null}
    </div>

  )

};