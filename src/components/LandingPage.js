import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FiltersContainer from "./FiltersContainer";
import Header from "./Header";
import axios from "axios";
import { useSnackbar } from "notistack";
import VideoCard from "./VideoCard";
import { SentimentDissatisfied } from "@mui/icons-material";
import "./LandingPage.css";

const LandingPage = ({
  videosData,
  setVideosData,
  sortBy,
  setSortBy,
  setIsPlayerActive,
}) => {
  const [error, setError] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchVideosData, setSearchVideosData] = useState([]);
  const [genreFilterList, setGenreFilterList] = useState([]);
  const [ageFilterList, setAgeFilterList] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const url = "https://5b378e6d-6004-4e95-89b0-006037077c19.mock.pstmn.io";

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    performFiltering();
  }, [genreFilterList, ageFilterList]);

  useEffect(() => {
    performSortBy();
  }, [sortBy]);

  const getApiData = async () => {
    try {
      const data = await axios.get(`${url}/v1/videos`);
      const videosDataFromApi = data.data.videos;
      // console.log(videosDataFromApi);
      setVideosData((prevVideos) => videosDataFromApi);
    } catch (e) {
      setError(true);
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, {
          variant: "error",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(
          "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
            autoHideDuration: 1000,
          }
        );
      }
    }
  };

  // console.log(videosData);

  const performSortBy = async () => {
    if (sortBy !== "releaseDate") {
      const apiData = await axios.get(`${url}/v1/videos?sortBy=viewCount`);
      const videos = apiData.data.videos;
      console.log(videos);
      setFilteredVideos(videos);
    } else {
      const apiData = await axios.get(`${url}/v1/videos?sortBy=releaseDate`);
      const videos = apiData.data.videos;
      console.log(videos);
      setFilteredVideos(videos);
    }
  };

  const performFiltering = async () => {
    if (genreFilterList.length) {
      let urlParams = genreFilterList.join(",");
      urlParams = `?genres=${urlParams}`;
      performApiActionForFiltering(urlParams);
    }

    // console.log(videos);
    else if (!genreFilterList.length && !ageFilterList.length) {
      const urlParams = "?genres=All";
      performApiActionForFiltering(urlParams);
      // try {
      //   const apiData = await axios.get(`${url}/v1/videos?genres=All`);
      //   const videos = apiData.data.videos;
      //   setFilteredVideos(videos);
      // } catch (e) {
      //   if (e.response && e.response.status === 400) {
      //     enqueueSnackbar(e.response.data.message, {
      //       variant: "error",
      //       autoHideDuration: 1000,
      //     });
      //   } else {
      //     enqueueSnackbar(
      //       "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
      //       {
      //         variant: "error",
      //         autoHideDuration: 1000,
      //       }
      //     );
      //   }
      // }
    } else if (ageFilterList.length && !genreFilterList.length) {
      let urlParams = ageFilterList.toString().replace("+", "%2B");
      urlParams = `?contentRating=${urlParams}`;
      performApiActionForFiltering(urlParams);
      // try {
      //   const apiData = await axios.get(
      //     `${url}/v1/videos?contentRating=${urlParams}`
      //   );
      //   const videos = apiData.data.videos;
      //   setFilteredVideos(videos);
      // } catch (e) {
      //   if (e.response && e.response.status === 400) {
      //     enqueueSnackbar(e.response.data.message, {
      //       variant: "error",
      //       autoHideDuration: 1000,
      //     });
      //   } else {
      //     enqueueSnackbar(
      //       "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
      //       {
      //         variant: "error",
      //         autoHideDuration: 1000,
      //       }
      //     );
      //   }
      // }
    }

    return;
  };

  const performApiActionForFiltering = async (urlParams) => {
    try {
      const apiData = await axios.get(`${url}/v1/video${urlParams}`);
      const videos = apiData.data.videos;
      setFilteredVideos(videos);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, {
          variant: "error",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(
          "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
            autoHideDuration: 1000,
          }
        );
      }
    }
  };

  const handleSearchData = (event) => {
    if (event.target.value) {
      setSearchData((prevValue) => event.target.value);
    } else {
      setError(false);
      setSearchVideosData([]);
    }
    return searchData;
  };

  const performSearch = async () => {
    if (searchData.length) {
      const searchResult = await axios.get(
        `${url}/v1/videos?title=${searchData}`
      );
      const videos = searchResult.data.videos;
      console.log(videos);
      if (videos.length) {
        setError(false);
        setSearchVideosData((prevData) => videos);
      } else {
        setError(true);
      }
    }
  };

  const handleChipFilters = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    // console.log(clicked);
    if (name === "genre") {
      // e.target.style.backgroundColor = "black";
      if (value === "All") {
        setGenreFilterList([]);
        setSearchVideosData([]);
        return;
      }
      if (genreFilterList.includes(value)) {
        // e.target.style.backgroundColor = "white";
        const existingFilter = genreFilterList.filter(
          (genre) => genre !== value
        );
        setGenreFilterList((prevValue) => existingFilter);
        return;
      }
      const filterValues = [...genreFilterList, value];
      setGenreFilterList((prevValue) => filterValues);
    } else if (name === "age") {
      if (value === "All") {
        setAgeFilterList([]);
        setSearchVideosData([]);
        return;
      }
      if (ageFilterList.includes(value)) {
        const existingFilter = ageFilterList.filter((age) => age !== value);
        setAgeFilterList((prevValue) => existingFilter);
        return;
      }
      if (ageFilterList.length) {
        setAgeFilterList((prevValue) => [value]);
        return;
      }
      const filterValues = [...ageFilterList, value];
      setAgeFilterList((prevValue) => filterValues);
    }
  };

  const errorContainer = (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} className="loading">
        <SentimentDissatisfied />
        <p>Unable to Load Videos</p>
      </Grid>
    </Box>
  );

  const getVideosList = (videos) => {
    return (
      <Box sx={{ padding: "1rem" }}>
        <Grid container spacing={2}>
          {videos.map((video) => (
            <Grid item xs={12} sm={3} key={video._id}>
              <VideoCard
                video={video}
                id={video._id}
                setIsPlayerActive={setIsPlayerActive}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  let videosContainer;
  if (error) {
    videosContainer = errorContainer;
  } else if (searchVideosData.length) {
    videosContainer = getVideosList(searchVideosData);
  } else if (filteredVideos.length) {
    videosContainer = getVideosList(filteredVideos);
  } else if (videosData.length) {
    videosContainer = getVideosList(videosData);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header
          handleSearchData={handleSearchData}
          performSearch={performSearch}
        />
        <FiltersContainer
          handleChipFilters={handleChipFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleSortBy={handleSortBy}
          genreFilterList={genreFilterList}
          ageFilterList={ageFilterList}
        />
        {videosContainer}
      </Grid>
    </Grid>
  );
};

export default LandingPage;
