import React, { useState, useEffect } from 'react';

import ReactMapGL, {Marker} from 'react-map-gl';

const Map = (props) => {
    
    const REACT_APP_MAMBOX_TOKEN="pk.eyJ1Ijoic2hsb21pc2hhdml0IiwiYSI6ImNrNHpsajZkbDBianozbW1yZzMxNjJ0dGwifQ.TdeLMP-M4BNqZrBMxWA9mw"

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100vh",
        latitude: 32.07748413542289,
        longitude: 34.77018329565137,
        zoom: 13
    });

    const updateCoordinates = () => {
        const latitude = props.cityCoordinates !== '' ? props.cityCoordinates[0] : viewport.latitude;
        const longitude = props.cityCoordinates !== '' ? props.cityCoordinates[1] : viewport.longitude;
        viewport.latitude = latitude;
        viewport.longitude = longitude;
    }
    
  useEffect(() => {
    updateCoordinates();
  });
    
  return (
      <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={REACT_APP_MAMBOX_TOKEN}
          onViewportChange={viewport => {
            setViewport(viewport)
            updateCoordinates()
          }}
       >
           
        {props.categoriesCoordinates.map((coordinates, index) => 
            
            <Marker 
                key={index}
                latitude={coordinates[0]}
                longitude={coordinates[1]}>
                <img src="https://i.imgur.com/MK4NUzI.png" alt="map marker"/>
                    
            </Marker>
        )}
       
       </ReactMapGL>
  );
}

export default Map;