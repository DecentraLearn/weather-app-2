import { useState, useEffect } from "react";
import './SevenDayForecast.css'

const dayOfTheWeek= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function SevenDayForecast(props) {
    const [data, setData] = useState();
    const [hasError, setHasError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    
    const [lon, lat] = [props.lon, props.lat];
    let dailyForecast, days = [[], []]

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=6182c919139c9b108386b3f178c8a7fd`)
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

    if(!loaded) {
        return (
            <div>
            </div>
        )
    } else if (hasError) {
        return <p>error</p>
    } else {
        dailyForecast = [...data.daily]; 
        for (let i = 0; i < dailyForecast.length; i++) {
            let day;
            if(i === 0) {
                day = 'Today';
            } else if(i === 1) {
                day = 'Tomorrow';
            } else {
                let today = new Date();
                if(today.getDay() + i <= 6) {
                    day = dayOfTheWeek[today.getDay() + i]
                } else {
                    day = dayOfTheWeek[(today.getDay() + i) - 7]
                }
            }
            let high = Math.round(dailyForecast[i].temp.max);
            let low = Math.round(dailyForecast[i].temp.min);
            let description = dailyForecast[i].weather[0].main;
            /*
            let icon = dailyForecast[i].weather.icon;
            let percipProb = dailyForecast[i].pop;
            */
            const dayCard = <div id={`forecast-day-${i}`} className='forecast-day'>
                                <div  id={`day-${i}`} className='forecast-dayOfTheWeek'>{day}</div>
                                <div id='high-label' className='label'>
                                    High:<div id={`high-${i}`} className='forecast-high'>{high}°F</div>
                                </div>
                                <div id='low-label' className='label'>
                                    Low:<div id={`low-${i}`} className='forecast-low'>{low}°F</div>
                                </div>
                                <div id={`description-${i}`} className='forecast-description'>{description}</div>
                            </div>
            if(i < dailyForecast.length - 1) {
                days.push(dayCard, <div className='line'/>);
            } else {
                days.push(dayCard);
            }
            
        }
        return (
        <div id='seven-day-forecast'>
            {days}
        </div>
        )
    }
}

export default SevenDayForecast;