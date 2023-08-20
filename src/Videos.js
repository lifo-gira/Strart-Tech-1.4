import React from "react";
import ReactPlayer from "react-player";
function Videos() {
  return (
    
      <ReactPlayer
          className='react-player'
          url={[
            'https://www.youtube.com/watch?v=oUFJJNQGwhk',
            'https://www.youtube.com/watch?v=jNgP6d9HraI'
          ]}          
          height='250px'
          width='500px'
        />
        
  );
}

export default Videos;
