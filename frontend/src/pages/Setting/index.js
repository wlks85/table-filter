import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormGroup,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import axios from "../../utils/axios";

export default function Setting() {
  const [variableFile, setVariableFile] = useState(null);
  const [metaDataFile, setMetaDataFile] = useState(null);
  const [variableLoading, setVariableLoading] = useState(false);
  const [metadataLoading, setMetadataLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleVariableFileChange = (newValue) => {
    setVariableFile(newValue);
  };
  const handleMetadataFileChange = (newValue) => {
    setMetaDataFile(newValue);
  };

  
  const handleVariableSubmit = () => {
    if (!variableFile) return;
    setVariableLoading(true);
    const formData = new FormData();

    formData.append("file", variableFile);
    axios
      .post("/api/variables", formData)
      .then((res) => {
        setVariableFile(null);
        setVariableLoading(false);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setVariableLoading(false);
      });
  };

  const handleMetadataSubmit = () => {
    if (!metaDataFile) return;
    setMetadataLoading(true);
    const formData = new FormData();
    formData.append("file", metaDataFile);
    axios
      .post("/api/metadata", formData)
      .then((res) => {
        setMetaDataFile(null);
        setMetadataLoading(false);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setMetadataLoading(false);
      });
  };

  const handleMessageClose = () => {
    setMessage(null);
  };

  return (
    <Stack
      spacing={5}
      style={{
        maxWidth: "1920px",
        width: "94%",
        margin: "auto",
        marginTop: 50,
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardHeader title="Variable/Variant" />
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          {variableLoading ? (
            <CircularProgress />
          ) : (
            <FormGroup row={true}>
              <Stack spacing={2} direction={"row"}>
                {/*  */}
                <FormControl>
                  <MuiFileInput
                    value={variableFile}
                    onChange={handleVariableFileChange}
                    placeholder="Click here"
                  />
                  {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                </FormControl>
                <Button
                  color="primary"
                  size="medium"
                  variant="contained"
                  onClick={handleVariableSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </FormGroup>
          )}
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader title="Metadata" />
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          {metadataLoading ? (
            <CircularProgress />
          ) : (
            <FormGroup row={true}>
              <Stack spacing={2} direction={"row"}>
                {/* <FormControl>
            <TextField
            value={variableName}
            label='Variable name'
            required
            type='text'
            onChange={handleVariableNameChange}
            />  
          </FormControl> */}
                <FormControl>
                  <MuiFileInput
                    value={metaDataFile}
                    onChange={handleMetadataFileChange}
                    placeholder="Click here"
                  />
                  {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                </FormControl>
                <Button
                  color="primary"
                  size="medium"
                  variant="contained"
                  onClick={handleMetadataSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </FormGroup>
          )}
        </CardContent>
      </Card>
      <Snackbar
        open={message != null}
        autoHideDuration={6000}
        onClose={handleMessageClose}
        message={message}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      />
    </Stack>
  );
}
