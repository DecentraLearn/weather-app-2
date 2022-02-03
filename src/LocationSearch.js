import { useState, useEffect, useRef } from "react";

function LocationSearch(props) {
    const [lon, setLon] = useState(-104.9915);
    const [lat, setLat] = useState(39.7420);
    
    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            props.callBack(lon, lat);
        } else didMount.current = true;
    })

    const getLocation = () => {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(setLocation);
        } else {
          alert('Geolocation is not supported by this browser.');
        } 
      }
    
    const setLocation = (e) => {
        setLon(e.coords.longitude.toFixed(4));
        setLat(e.coords.latitude.toFixed(4));
      }

    return(
        <div>
            <button id='get-location' onClick={getLocation}>Set Current Location</button>
        </div>
    )
}

export default LocationSearch;