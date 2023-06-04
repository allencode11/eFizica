import Container from "@mui/material/Container";
import {Card, Grid} from "@mui/material";
import file1 from "../../pdf/test.pdf";
import file2 from "../../pdf/licenta copie final.pdf";

export const LabPage = () => {
    return (
        <div>
            <div style={{marginTop: 20, color: '#1e90ff', textAlign: 'center', fontSize: 35}}>Lucrări de laborator</div>
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
                                    data={file1}
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
                                    data={file2}
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