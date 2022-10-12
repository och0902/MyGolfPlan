export function getTime1() {
   let date, year, month, day, ampm, hours, minutes, seconds, time;
   const week = ["일", "월", "화", "수", "목", "금", "토"];

   date = new Date();
   year = date.getFullYear();
   month = date.getMonth() + 1;
   day = date.getDate();
   hours = date.getHours();
   minutes = date.getMinutes();
   seconds = date.getSeconds();

   month = month < 10 ? `0${month}` : month;
   day = day < 10 ? `0${day}` : day;
   if (hours < 13) { ampm = "AM"; }
      else { ampm = "PM"; hours = Number(hours) - 12; };
   hours = hours < 10 ? `0${hours}` : hours;
   minutes = minutes < 10 ? `0${minutes}` : minutes;
   seconds = seconds < 10 ? `0${seconds}` : seconds;

   time = `현재시간 : ${year}.${month}.${day} ${week[date.getDay()]} ${ampm}${hours}:${minutes}:${seconds}`;

   return time;
};


// --------------------------------------------------------------------------------------------


export function getTime2() {
   let date, year, month, day, hours, minutes;

   date = new Date();
   year = date.getFullYear();
   month = date.getMonth() + 1;
   day = date.getDate();
   hours = date.getHours();
   minutes = date.getMinutes();

   month = month < 10 ? `0${month}` : month;
   day = day < 10 ? `0${day}` : day;
   hours = hours < 10 ? `0${hours}` : hours;
   minutes = minutes < 10 ? `0${minutes}` : minutes;

   let baseDate, baseTime;
   baseDate = `${year}${month}${day}`;
   const time = Number(`${hours}${minutes}`); 

   if( time > 2310 ) baseTime = '2300';
   else if ( time > 2010 ) baseTime = '2000';
   else if ( time > 1710 ) baseTime = '1700';
   else if ( time > 1410 ) baseTime = '1400';
   else if ( time > 1110 ) baseTime = '1100';
   else if ( time > 810 ) baseTime = '0800';
   else if ( time > 510 ) baseTime = '0500';
   else if ( time > 210 ) baseTime = '0200';
   else { 
      baseDate = `${year}${month}${day-1}`;
      baseTime = '2300';
   }

   return { baseDate, baseTime };
};