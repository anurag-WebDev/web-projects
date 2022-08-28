import React, { useState } from "react";
import { Button, MenuItem, Stack, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSnackbar } from "notistack";
import moment from "moment";

const FormDialog = ({ handleClose, handleClickOpen, open }) => {
  const { enqueueSnackbar } = useSnackbar();

  const uploadData = {
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: "",
    previewImage: "",
  };

  const genreFilters = [
    { genre: "Education" },
    { genre: "Sports" },
    { genre: "Comedy" },
    { genre: "Lifestyle" },
  ];

  const ageFilters = [
    { age: "7+" },
    { age: "12+" },
    { age: "16+" },
    { age: "18+" },
  ];
  const [genre, setGenre] = useState("Education");
  const [age, setAge] = useState("7+");
  const [formInput, setFormInput] = useState(uploadData);

  const handleInputChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    setFormInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const uploadVideo = async (data) => {
    const postData = {
      ...data,
      releaseDate: moment(data.releaseDate).format("DD MM YYYY"),
    };

    if (validateInputData(postData) === true) {
      try {
        const url =
          "https://524a18e4-9414-4e52-8ffa-ad7b629aa7be.mock.pstmn.io/v1/videos";

        const res = await axios.post(url, postData);
        console.log(res);
        if (res.status === 201) {
          handleClose();
          console.log("Done");
          enqueueSnackbar("Video Added Succesfully", {
            variant: "success",
            autoHideDuration: 1000,
          });
        }
      } catch (e) {
        if (e.response && e.response.data) {
          enqueueSnackbar(e.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar("Something went wrong", { variant: "error" });
        }
      }
    }
  };

  const validateInputData = (data) => {
    if (!data.videoLink) {
      enqueueSnackbar("videoLink is Required", { variant: "warning" });
      return false;
    }
    if (!data.title) {
      enqueueSnackbar("title is Required", { variant: "warning" });
      return false;
    }
    if (!data.genre) {
      enqueueSnackbar("genre is Required", { variant: "warning" });
      return false;
    }
    if (!data.contentRating) {
      enqueueSnackbar("contentRating is Required", { variant: "warning" });
      return false;
    }
    if (!data.releaseDate) {
      enqueueSnackbar("releaseDate is Required", { variant: "warning" });
      return false;
    }
    if (!data.previewImage) {
      enqueueSnackbar("previewImage is Required", { variant: "warning" });
      return false;
    }
    return true;
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <DialogTitle>Upload Video</DialogTitle>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent>
          <TextField
            required
            value={formInput.videoLink}
            name="videoLink"
            label="Video Link"
            helperText="This link will be used to derive the video"
            margin="dense"
            fullWidth
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <TextField
            required
            value={formInput.previewImage}
            name="previewImage"
            label="Thumbnail Image Link"
            helperText="This link will be used to preview the thumbnail image"
            margin="dense"
            fullWidth
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <TextField
            required
            value={formInput.title}
            name="title"
            label="Title"
            helperText="The title will be representative text for video"
            margin="dense"
            fullWidth
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <TextField
            required
            select
            name="genre"
            label="Genre"
            helperText="Genre will help in categorizing your videos"
            margin="dense"
            value={formInput.genre}
            fullWidth
            onChange={(e) => {
              handleInputChange(e);
            }}
          >
            {genreFilters.map((genre, index) => {
              return (
                <MenuItem value={genre.genre} key={index}>
                  {genre.genre}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            required
            select
            name="contentRating"
            label="Suitable age group for the clip"
            helperText="This will be used to filter videos on age group suitability"
            margin="dense"
            value={formInput.contentRating}
            fullWidth
            onChange={(e) => {
              handleInputChange(e);
            }}
          >
            {ageFilters.map((age, index) => {
              return (
                <MenuItem value={age.age} key={index}>
                  {age.age}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            required={true}
            value={formInput.releaseDate}
            type="date"
            name="releaseDate"
            label="Release date"
            helperText="This will be used to sort videos"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={() => uploadVideo(formInput)}
          >
            Upload Video
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormDialog;
