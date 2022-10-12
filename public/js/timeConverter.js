export function convertTime1(timeEpoch) {
   let date, year, month, day, ampm, hours, minutes, seconds, time;
   const week = ["일", "월", "화", "수", "목", "금", "토"];

   date = new Date(timeEpoch*1000);
   year = date.getFullYear();
   month = date.getMonth() + 1;
   day = date.getDate();
   hours = date.getHours();
   minutes = date.getMinutes();

   month = month < 10 ? `0${month}` : month;
   day = day < 10 ? `0${day}` : day;
   hours = hours < 10 ? `0${hours}` : hours;
   minutes = minutes < 10 ? `0${minutes}` : minutes;

   time = `${year}.${month}.${day} ${week[date.getDay()]}요일 ${hours}:${minutes}`;

   return time;
};


// --------------------------------------------------------------------------------------------


export function convertTime2(timeEpoch) {
   let date, month, day, hours, time;
   const week = ["일", "월", "화", "수", "목", "금", "토"];

   date = new Date(timeEpoch*1000);
   month = date.getMonth() + 1;
   day = date.getDate();
   hours = date.getHours();
   
   month = month < 10 ? `0${month}` : month;
   day = day < 10 ? `0${day}` : day;
   hours = hours < 10 ? `0${hours}` : hours;

   time = `${month}/${day}(${week[date.getDay()]}) ${hours}시`;

   return time;
};


// --------------------------------------------------------------------------------------------


export function convertTime3(timeEpoch) {
   let date, year, month, day, ampm, hours, minutes, seconds, time;
   const week = ["일", "월", "화", "수", "목", "금", "토"];

   date = new Date(timeEpoch*1000);
   year = date.getFullYear()-2000;
   month = date.getMonth() + 1;
   day = date.getDate();
   
   month = month < 10 ? `0${month}` : month;
   day = day < 10 ? `0${day}` : day;

   time = `${month}/${day}(${week[date.getDay()]})`;

   return time;
};

