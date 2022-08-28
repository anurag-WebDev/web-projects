import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Link, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import "./VideoViewing.css";
import VideoCard from "./VideoCard";

const VideoViewing = ({ props }) => {
  const [videoPlayerDetails, setVideoPlayerDetails] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    getDetailsForVideoPlayer();
    getVideoDetails();
    viewCount();
  }, [id]);

  // console.log(id);
  const url =
    "https://5b378e6d-6004-4e95-89b0-006037077c19.mock.pstmn.io/v1/videos";

  const getDetailsForVideoPlayer = async () => {
    try {
      const data = await axios.get(`${url}/${id}`);
      const videoDetails = data.data;
      setVideoPlayerDetails(videoDetails);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, {
          variant: "error",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(
          "Could not fetch Videos. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
            autoHideDuration: 1000,
          }
        );
      }
    }
  };

  // console.log(videoPlayerDetails);
  const videoUrl = `https://${videoPlayerDetails.videoLink}`;

  const getVideoDetails = async () => {
    try {
      const data = await axios.get(`${url}`);
      const videosDataFromApi = data.data.videos;
      // console.log(videosDataFromApi);
      setVideosData((prevVideos) => videosDataFromApi);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, {
          variant: "error",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(
          "Could not fetch Videos. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
            autoHideDuration: 1000,
          }
        );
      }
    }
  };

  const viewCount = async () => {
    try {
      const res = await axios.patch(`${url}/${id}/views`);
      if (res.status === 204) {
        enqueueSnackbar("View Added", {
          variant: "success",
          autoHideDuration: 1000,
        });
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, {
          variant: "error",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(
          "Could not fetch Videos. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
            autoHideDuration: 1000,
          }
        );
      }
    }
  };

  const handleVotes = async (e) => {
    let votesBody = {
      vote: e.target.name,
      change: "increase",
    };

    try {
      const res = await axios.patch(`${url}/${id}/votes`, votesBody);
      if (res.status === 204) {
        enqueueSnackbar("Voted Succesfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, {
          variant: "error",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(
          "Could not fetch Videos. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
            autoHideDuration: 1000,
          }
        );
      }
    }
  };

  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Box className="header">
              <Box className="header-Title">
                {" "}
                <Link to={{ pathname: `/` }}>
                  <Typography variant="h4" fontFamily="fantasy">
                    XFlix
                  </Typography>
                </Link>
              </Box>
            </Box>
            <Box
              padding="1rem"
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "50vh",
              }}
            >
              <iframe
                sx={{ display: "flex" }}
                width="100%"
                height="125%"
                title={videoPlayerDetails.title}
                src={videoUrl}
              ></iframe>
              <Box>
                <Typography variant="h6">{videoPlayerDetails.title}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="h7">
                    {videoPlayerDetails.viewCount}
                  </Typography>
                  <Typography variant="h7">
                    {videoPlayerDetails.genre}
                  </Typography>
                  <Typography variant="h7">
                    {videoPlayerDetails.releaseDate}
                  </Typography>
                </Stack>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <Button
                      name="upVote"
                      variant="contained"
                      startIcon={<ThumbUpIcon />}
                      onClick={(e) => handleVotes(e)}
                    ></Button>
                    <Button
                      name="downVote"
                      variant="contained"
                      sx={{ paddingRight: "1rem" }}
                      startIcon={<ThumbDownIcon />}
                      onClick={(e) => handleVotes(e)}
                    ></Button>
                  </Stack>
                </Box>
              </Box>
            </Box>

            <Box>
              <Grid container spacing={2}>
                {videosData
                  .filter((video) => video._id !== id)
                  .map((video) => (
                    <Grid item xs={12} sm={3} key={video._id}>
                      <VideoCard video={video} id={video._id} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default VideoViewing;
