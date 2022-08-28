import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import VideoViewing from "./components/VideoViewing";

const App = () => {
  const [sortBy, setSortBy] = useState("releaseDate");
  // const [urlId, setUrlId] = useState([]);
  const [videosData, setVideosData] = useState([]);

  const [isPlayerActive, setIsPlayerActive] = useState(false);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              videosData={videosData}
              setVideosData={setVideosData}
              sortBy={sortBy}
              setSortBy={setSortBy}
              setIsPlayerActive={setIsPlayerActive}
              // setUrlId={setUrlId}
            />
          }
        ></Route>
        <Route
          path="/video/:id"
          element={
            <VideoViewing
              videosData={videosData}
              setVideosData={setVideosData}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
