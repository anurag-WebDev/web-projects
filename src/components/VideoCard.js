import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import moment from "moment";

const VideoCard = ({ video, id }) => {
  return (
    <Link to={{ pathname: `/video/${id}` }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={video.previewImage}
          alt={video.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {video.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {moment(video.releaseDate).fromNow()}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VideoCard;
