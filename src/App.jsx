import React, { useContext } from 'react';
import Sidebar from './Components/Sidebar';
import Display from './Components/Display';
import Player from './Components/Player';
import { BrowserRouter } from 'react-router-dom'; 
import { PlayerContext } from './Context/PlayerContext';

const App = () => {
  // Destructure both audioRef and track from PlayerContext
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <BrowserRouter> 
      <div className='h-screen bg-black'>
        <div className='h-[90%] flex'>
          <Sidebar />
          <Display />
        </div>
        <Player />
        {/* Ensure that track is defined before using it */}
        {track && (
          <audio preload='auto' ref={audioRef} src={track.file}></audio>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
