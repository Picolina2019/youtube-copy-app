import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import axios from './api/axios';
import { SearchBar, VideoList, VideoDetail } from './components';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    handleSubmit('react js');
  }, []);

  const handleSubmit = async (search) => {
    try {
      const response = await axios.get('search', {
        params: {
          part: 'snippet',
          maxResults: 5,
          key: 'AIzaSyAQdH1QigiyW6QdROypklJzsGItHjjZ2-o',
          q: search,
        },
      });
      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0]);
    } catch (error) {
      setError(true);
      setVideos([]);
      setSelectedVideo(null);
    }
  };

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <Grid justify='center' container spacing={1}>
      <Grid item xs={10}>
        <Grid container spacing={10}>
          <Grid item xs={10}>
            <SearchBar onFormSubmit={handleSubmit} />
          </Grid>
          {error ? (
            <p style={{textAlign:'center', fontSize:'26px', color:'red',
          margin:'auto'}}>Error! Something went wrong.</p>
          ) : (
            <>
              <Grid item xs={8}>
                <VideoDetail video={selectedVideo} />
              </Grid>
              <Grid item xs={4}>
                <VideoList videos={videos} onVideoSelect={onVideoSelect} />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
