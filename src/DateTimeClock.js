import { useEffect, useState } from "react";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function DateTimeClock() {
    const now = new Date();
    const [date, setDate] = useState(now);
    useEffect(() => {
        let now = new Date();
        let running = setInterval(() => {
            setDate(now);
        }, 1000);
        return () => clearInterval(running)
    });

    let day = days[date.getDay()];
    let dayOfMonth = date.getDate();
    let month = months[date.getMonth()];
    let hours = date.getHours() === 0 ? 12 : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    let mornOrAft = date.getHours() === 0 ? 'AM' : date.getHours() > 12 ? 'PM' : 'AM';
    
    return(
        <div id='dateTimeClock'>
            <div id='date'>{day} {month} {dayOfMonth}</div>
            <div id='time'>{hours}:{minutes}:{seconds} {mornOrAft}</div>
        </div>
    )
}

export default DateTimeClock;