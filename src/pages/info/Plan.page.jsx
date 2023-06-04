import { useCallback, useEffect, useState } from 'react';
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
import { Document, Page, pdfjs } from "react-pdf";
import samplePDF from './test.pdf';
import Typography from '@mui/material/Typography';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const InfoPlanPage = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(samplePDF);
  const [loading, setLoading] = useState(false);

  const handleChangePage = (num) => {
    setPageNumber(num++);
  };

  const onChangeFile = (file) => {
    if(file == null)
      return;

    setPdfFile(file);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Typography>Scuze de deranj!</Typography>
      <Typography>Acesta pagina va fi actualizata in curand</Typography>
    </div>

  );
}
