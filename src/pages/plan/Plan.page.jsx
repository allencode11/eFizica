import { useCallback, useEffect, useState } from 'react';
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
import { Document, Page, pdfjs } from "react-pdf";
import samplePDF from './test.pdf';
import Typography from '@mui/material/Typography';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PlanPage = () => {
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
    // <div>
    //   {
    //     samplePDF ? (
    //       <Document file={samplePDF} onLoadError={console.error}>
    //         <Page pageNumber={pageNumber}/>
    //       </Document>
    //     ) : uploadButton
    //   }
    //   <Upload
    //     name="file"
    //     listType="picture-card"
    //     className="file-uploader"
    //     showUploadList={false}
    //     onChange={onChangeFile}
    //     style={{width: '80%', display:'flex', flexDirection: 'column', justifyContent: 'space-between'}}
    //     />
    //   <Button onClick={() => {handleChangePage(pageNumber + 1)}} >Next</Button>
    // </div>
    <div>
      <Typography>Scuze de deranj!</Typography>
      <Typography>Acesta pagina va fi actualizata in curand</Typography>
    </div>

  );
}
