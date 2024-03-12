import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import axios from "../../utils/axios";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [selectedVariants, setSelectedVariants] = useState();
  const [variables, setVariables] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState();
  const [variants, setVariants] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getParam, setGetParam] = useState([]);
  const [rowCount, setRowCount] = useState(100000);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 1000,
  });

  const columns = [
    {
      field: "uid",
      headerName: "UID",
      width: 150,
    },

    {
      field: "variant_1",
      headerName: "Variant",
      width: 150,
    },

    {
      field: "play/pause",
      headerName: "Play/Pause",
      width: 300,
      renderCell: (params) => {
        if (params.value != "#") {
          return (
            <audio controls>
              <source
                src={`https://wanitsch.ch/sdats-manager/audio/${params.row.filepath}.flac`}
                // type="audio"
              ></source>
            </audio>
          );
        }
      },
    },

    {
      field: "place",
      headerName: "Place",
      width: 150,
    },
    {
      field: "latitude",
      headerName: "Latitude",
      width: 150,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      width: 150,
    },
    {
      field: "site_code",
      headerName: "Site Code",
      width: 150,
    },
    {
      field: "sds_code",
      headerName: "SDS Code",
      width: 150,
    },
    {
      field: "kanton",
      headerName: "Kanton",
      width: 150,
    },
    {
      field: "age_cohort",
      headerName: "Age Conhort",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
    },
    {
      field: "mobility",
      headerName: "Mobility",
      width: 150,
    },

    {
      field: "filepath",
      headerName: "Download",
      width: 250,
      renderCell: (params) => {
        if (params.value != "#") {
          return (
            <Link
              target="_blank"
              to={`https://wanitsch.ch/sdats-manager/audio/${params.value}.flac`}
            >
              <Button startIcon={<DownloadForOfflineIcon />}>
                {params.value}
              </Button>
            </Link>
          );
        } else {
          return <>{params.value}</>;
        }
      },
    },
  ];

  useEffect(() => {
    axios
      .get("/api/variables")
      .then((res) => {
        const { data } = res.data;
        setVariables(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios
      .get("/api/variants", {
        params: {
          variables: [selectedVariable],
        },
      })
      .then((res) => {
        const { variants } = res.data;
        setSelectedVariants([]);
        setVariants(variants);
      })
      .catch(() => {});
  }, [selectedVariable]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/metadata", {
        params: {
          variants: selectedVariants,
          variables: [...[], selectedVariable],
          paginationModel,
        },
      })
      .then((res) => {
        let { data, total } = res.data;
        let metadata = data.map((item) => {
          return Object.assign({}, item.metadata, {
            filepath: item.filepath,
            variant_1: item.variant_1,
          });
        });
        setLoading(false);
        setMetadata(metadata);
        setRowCount(total);
      })
      .catch(() => {});
  }, [selectedVariable, selectedVariants, paginationModel]);

  const handleVariableChange = (event, value) => {
    setSelectedVariable(value);
  };

  const handleVariantChange = (event, value) => {
    setSelectedVariants(value);
    setGetParam(value);
  };

  const handlePaginationModelChange = (model) => {
    setPaginationModel(model);
  };

  return (
    <Box
      sx={{
        paddingTop: 12,
        mx: "auto",
      }}
      style={{ maxWidth: "1920px", width: "94%" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Stack sx={{ paddingBottom: 1 }}>
            <Typography variant="h6" align="left">
              Filter
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Autocomplete
              id="variable"
              fullWidth
              options={variables}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setSelectedVariable(newValue);
              }}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option._id}>
                    {option.name}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Filter Variables"
                  placeholder="Filter Variables"
                />
              )}
            />
            {variants.length ? (
              <Autocomplete
                id="variant"
                fullWidth
                multiple
                options={variants}
                onChange={handleVariantChange}
                value={selectedVariants}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter Variants"
                    placeholder="Filter Variants"
                  />
                )}
              />
            ) : (
              <Stack sx={{ width: "100%" }}></Stack>
            )}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            paddingTop: 8,
          }}
        >
          <Stack sx={{ paddingBottom: 1 }}>
            <Typography variant="h6" align="left">
              Metadata
            </Typography>
          </Stack>
          {!loading ? (
            <DataGridPro
              rows={metadata}
              columns={columns}
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  pinnedColumns: { left: ["uid"], right: ["mobility"] },
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pagination
              rowCount={rowCount}
              paginationMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={(model) => setPaginationModel(model)}
              pageSizeOptions={[10, 25, 50, 100, 1000]}
              style={{ maxWidth: "1920px" }}
            />
          ) : (
            <CircularProgress size={32} sx={{ marginTop: 9 }} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
