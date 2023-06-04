import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {Card, Grid} from "@mui/material";
import Container from "@mui/material/Container";
import file1 from "../../pdf/P1.pdf";
import file2 from "../../pdf/P3.pdf";
import file3 from "../../pdf/P2.pdf";
import file4 from "../../pdf/P3.pdf";
export const PlanPage = (props) => {

  return (
      <div>
          <div style={{marginTop: 20, color: '#1e90ff', textAlign: 'center', fontSize: 35}}>Planuiri de lungă și scurtă durată</div>
          {
              <Container maxWidth={'xl'} style={{ marginTop: "25px", marginLeft: "45px", width: "97%"}}>
                <Grid container spacing={2}>
                      <Grid item key="1" sm={2.8} >
                          <Card
                              sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                              onClick={() => {}}
                          >
                              <object
                                  data={file1}
                                  type="application/pdf"
                                  width="100%"
                                  style={{ height: "450px" }}
                                  aria-label="This object displays an PDF file"
                              />
                          </Card>
                      </Grid>

                    <Grid item key="2" sm={2.8} >
                        <Card
                            sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                            onClick={() => {}}
                        >
                            <object
                                data={file2}
                                type="application/pdf"
                                width="100%"
                                style={{ height: "450px" }}
                                aria-label="This object displays an PDF file"
                            />
                        </Card>
                    </Grid>
                    <Grid item key="3" sm={2.8} >
                        <Card
                            sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                            onClick={() => {}}
                        >
                            <object
                                data={file3}
                                type="application/pdf"
                                width="100%"
                                style={{ height: "450px" }}
                                aria-label="This object displays an PDF file"
                            />
                        </Card>
                    </Grid>

                    <Grid item key="4" sm={2.8} >
                        <Card
                            sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                            onClick={() => {}}
                        >
                            <object
                                data={file4}
                                type="application/pdf"
                                width="100%"
                                style={{ height: "450px" }}
                                aria-label="This object displays an PDF file"
                            />
                        </Card>
                    </Grid>
              </Grid>
          </Container>
          }
      </div>
  );
}
