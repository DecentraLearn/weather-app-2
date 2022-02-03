import { useEffect, useState } from "react";
import DateTimeClock from "./DateTimeClock";
import './WeatherSnapshot.css';

function kelvinToFarenheit(kelv) {
    return (kelv * (9/5)) - 459.67;
}

function WeatherSnapshot(props) {
    const [data, setData] = useState();
    const [hasError, setHasError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    
    const [lon, lat] = [props.lon, props.lat];
    let temp, city, description, feelsLike, icon;

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6182c919139c9b108386b3f178c8a7fd`)
        .then((response) => response.json())
        .then((responseData) => {
            setData({...responseData});
            setLoaded(true);
        })
        .catch((err) => {
            setHasError(true);
            console.log(err);
        })
    }, [lon, lat]);

    if(loaded) {
        temp = kelvinToFarenheit(data.main.temp).toFixed(0);
        city = data.name;
        description = data.weather[0].description;
        feelsLike = kelvinToFarenheit(data.main.feels_like).toFixed(0);
        icon = data.weather[0].icon;
    }

    if(!loaded) {
        return (
            <div>
            </div>
        )
    } else if (hasError) {
        return <p>error</p>
    } else {
        return (
            <div> 
                <div id='snapshot-border' className='border'>
                    <div id='header'>
                        <div id='city'>{city}</div>
                        <DateTimeClock />
                    </div>
                    <div id='body'>
                        <div id='temp'>{temp}°F</div>
                        <div id='icon-background'>
                            <img id='icon' src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='icon' />
                        </div>
                    </div>
                    <div id='description'>Feels like {feelsLike}°F, {description}.</div>
                </div>
            </div>
        )  
    }     
}

export default WeatherSnapshot;