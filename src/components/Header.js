import { React, useState } from "react";
import {
  Box,
  IconButton,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import "./Header.css";
import FormDialog from "./FormDialog";
import UploadIcon from "@mui/icons-material/Upload";

const Header = ({ handleSearchData, performSearch }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FormDialog
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        open={open}
      />

      <Grid container>
        <Grid item xs={12} sm={12}>
          <Box className="header">
            <Grid item xs={12}>
              <Box className="header-Title">
                {" "}
                <Button onClick={() => window.location.reload()}>
                  <Typography variant="h4" fontFamily="fantasy">
                    XFlix
                  </Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex" }}>
                <TextField
                  label="Search For Videos"
                  variant="standard"
                  fullWidth={true}
                  onChange={(e) => handleSearchData(e)}
                />
                <IconButton aria-label="search" onClick={performSearch}>
                  <PageviewIcon fontSize="large" sx={{ marginTop: "0.5rem" }} />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ padding: "1rem" }}>
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  startIcon={<UploadIcon />}
                >
                  Upload
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
