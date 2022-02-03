
import WeatherSnapshot from './WeatherSnapshot';
import LocationSearch from './LocationSearch';
import './App.css';
import { useState } from 'react';

function App() {
  const [lon, setLon] = useState(-104.9915);
  const [lat, setLat] = useState(39.7420);
  const [located, setLocated] = useState(false);

  const setLocationCallback = (lon, lat) => {
    setLon(lon);
    setLat(lat);
    setLocated(true);
  }

  return (
    <div id='app'>
      <div id='align'>
        <LocationSearch callBack={setLocationCallback}/>
        <div id='snapshot'>
          <WeatherSnapshot lon={lon} lat={lat}/>
        </div>
      </div>
    </div>
  );
}


export default App;
