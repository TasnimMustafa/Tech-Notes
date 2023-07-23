import React from 'react';

const CurrentDateTime = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
  
    const daysOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeekNames[dayOfWeek];
  
    const monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthsNames[month];
  
    return (
      <div>
        <h5 style={{"color":"#000"}}>{dayName}, {monthName} {date},{year} at {hours}:{minutes}:{seconds}</h5>
      </div>
    );
  };
  
  export default CurrentDateTime;
