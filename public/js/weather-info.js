import { getTime2 } from './currentTime.js';
import { convertTime1, convertTime2, convertTime3 } from './timeConverter.js';
import { dfs_xy_conv } from './xyToLatlng.js';
// import Chart from '../node_modules/chart.js/auto';

export function weatherInfo1() {

   function graph(weatherData, catagory, id, title, yMin, yMax) {

      let x = [], y = [];
      // let fcstDateBefore = '';
      weatherData.filter( item => item.category === catagory ).forEach(element => {
         const fcstDate = element.fcstDate.slice(4);
         // if( fcstDate == fcstDateBefore  ) {
         //    x.push(element.fcstTime.slice(0, 2)+':00');
         // } else {
         //    x.push(fcstDate.slice(0, 2) + '/' + fcstDate.slice(2) + ' ' + element.fcstTime.slice(0, 2)+':00');
         //    fcstDateBefore = fcstDate;
         // };
         
         x.push(fcstDate.slice(0, 2) + '/' + fcstDate.slice(2) + ' ' + element.fcstTime.slice(0, 2)+':00');

         if (catagory === 'PCP') {
               if( element.fcstValue === "강수없음") y.push(0);
                  else y.push(element.fcstValue.slice('mm')[0]);
            }
            else y.push(element.fcstValue);
         // console.log(element.fcstDate, element.fcstTime, element.fcstValue);
      });
   
      new Chart(document.getElementById(id).getContext("2d"), {
         type: 'line',
         data: {
            labels: x,
            datasets: [{
               radius: 0,
               borderWidth: 1,
               borderColor: 'green',
               data: y,
               fill: false,
            }],
         },
         options: { 
            responsive: false,
            plugins: {
               title: { display: true, text: title, align: 'start', padding: { top: 40, bottom: 30 }, font: { size: 16 }, },
               legend: { display: false, },
            },
            aspectRatio: 2,
            scales: { y: { min: yMin, max: yMax, }, },     
         },

      });
   };

   const { baseDate, baseTime } = getTime2();
   // console.log(baseDate, baseTime);

   const xy = dfs_xy_conv("toXY", globalThis.clubLat, globalThis.clubLng);
   // console.log('x : ', xy['x'], '   y : ', xy['y']);
   
   const METEOROLOGICALAGENCY_REQ = 'getVilageFcst';
   const METEOROLOGICALAGENCY_API_KEY = 'AN31IO7l4%2FY3rLiPCz5OFT5DQJOf06W9QvkEVem6H%2BL5X2OxO0ox5VL3iRKqPeRVTKFgZjesO0%2FTaULh8F0hRA%3D%3D';
   const METEOROLOGICALAGENCY_URL = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/${METEOROLOGICALAGENCY_REQ}?serviceKey=${METEOROLOGICALAGENCY_API_KEY}&numOfRows=9999&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${xy['x']}&ny=${xy['y']}`;

   fetch(METEOROLOGICALAGENCY_URL)
      .then(response => response.json())
      .then(response => { 
         // console.log(response);
         const weatherData = response.response.body.items.item;
         // console.log(weatherData);

         let canvasContents = '';
         for( let idx = 1; idx <= 8; idx++ ) {
            canvasContents += `<canvas id="graph${idx}"></canvas>`;
         }
         document.getElementById('canvas-container').innerHTML = canvasContents;

         graph(weatherData, 'SKY', 'graph1', '하늘상태', 0, 4);
         graph(weatherData, 'TMP', 'graph2', '기온 °C', -5, 30);
         graph(weatherData, 'REH', 'graph3', '습도 %', 0, 100);
         graph(weatherData, 'PTY', 'graph4', '강수형태', 0, 1);
         graph(weatherData, 'POP', 'graph5', '강수확률 %', 0, 100);
         graph(weatherData, 'PCP', 'graph6', '강수량 mm/hr', 0, 10);
         graph(weatherData, 'WSD', 'graph7', '풍속 m/s', 0, 10);
         graph(weatherData, 'VEC', 'graph8', '풍향 °', 0, 360);
         // graph(weatherData, 'SNO', 'graph9', '적설량');
      });
};


// --------------------------------------------------------------------------------------------


export function weatherInfo2() {
   const OPENWEATHER_API_KEY = '2d56efda46a3c59aa999b0c9639dbfcf';
   const OPENWEATHER_API_URL1 = `https://api.openweathermap.org/data/2.5/weather?lat=${globalThis.clubLat}&lon=${globalThis.clubLng}&appid=${OPENWEATHER_API_KEY}&lang=kr`; 
   const OPENWEATHER_API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${globalThis.clubLat}&lon=${globalThis.clubLng}&appid=${OPENWEATHER_API_KEY}&lang=kr`;
   
   fetch(OPENWEATHER_API_URL1)
      .then(response => response.json())
      .then(response => {
         // console.log("response : ", response);
         const weatherData = response;
         let rain; if (weatherData.rain) rain = weatherData['rain']['1h']; else rain = '-';
         const currentWeather = `
            <h4>정보출처 : <a href="https://openweathermap.org">https://openweathermap.org</a></h4>
            <p>현재 날씨 [${convertTime1(weatherData.dt)} 기준]</p>
            <table>
               <tr><th>날씨</th><th>구름 %</th><th>기온 °C</th><th>습도 %</th><th>강수량 mm/hr</th><th>바람 m/s</th><th>가시거리 m</th>
               <tr>
                  <td>${weatherData.weather[0].description}</td>
                  <td>${weatherData.clouds.all}</td>
                  <td>${(Number(weatherData.main.temp)-273.15).toFixed(1)}</td>
                  <td>${weatherData.main.humidity}</td>
                  <td>${rain}</td>
                  <td>${weatherData.wind.speed}</td>
                  <td>${weatherData.visibility}</td>
               </tr>
            <table>
         `;
         document.getElementById('weather-info-21').innerHTML = currentWeather;
      });

   fetch(OPENWEATHER_API_URL2)
      .then(response => response.json())
      .then(response => {
         // console.log("response : ", response);
         const weatherData = response.list;

         let weatherForecast =`
            <p>예상 날씨</p>
            <table>
               <tr><th>날짜</th><th>날씨</th><th>구름 %</th><th>기온 °C</th><th>습도 %</th><th>강수량 mm/3hr</th><th>바람 m/s</th></tr>
         `;
         weatherData.forEach(list => {
            let rain; if (list.rain) rain = list['rain']['3h'];  else rain = '-';
            // console.log(list);
            weatherForecast += `
               <tr>
                  <td>${convertTime2(list.dt)}</td>
                  <td>${list.weather[0].description}</td>
                  <td>${list.clouds.all}</td>
                  <td>${(Number(list.main.temp)-273.15).toFixed(1)}</td>
                  <td>${list.main.humidity}</td>
                  <td>${rain}</td>
                  <td>${list.wind.speed}</td>
               </tr>
            `;
         });
         weatherForecast += `</table>`;
         document.getElementById('weather-info-22').innerHTML = weatherForecast;
      });
};


// --------------------------------------------------------------------------------------------


export function weatherInfo3() {
   const VISUALCROSSINGWEATHER_API_KEY = 'AMJQTTQLAWASUZGRXRLRPL8FT';
   const VISUALCROSSINGWEATHER_API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${globalThis.clubLat},${globalThis.clubLng}?key=${VISUALCROSSINGWEATHER_API_KEY}&contentType=json`;
   fetch(VISUALCROSSINGWEATHER_API_URL)
      .then(response => response.json())
      .then(response => {
         // console.log("response : ", response);
         const weatherData = response;
         globalThis.weatherInfo3Detail =  weatherData.days;

         const currentWeather = `
            <h4>정보출처 : <a href="https://visualcrossing.com">https://visualcrossing.com</a></h4>
            <p>현재 날씨 [${convertTime1(weatherData.currentConditions.datetimeEpoch)} 기준]</p>
            <table>
               <tr><th>날씨</th><th>구름 %</th><th>이슬점온도 °C</th><th>기온 °C</th><th>습도 %</th><th>바람 m/s</th><th>일출</th><th>일몰</th></tr>
               <tr>
                  <td>${weatherData.currentConditions.conditions}</td>
                  <td>${weatherData.currentConditions.cloudcover}</td>
                  <td>${((Number(weatherData.currentConditions.dew)-32)*5/9).toFixed(1)}</td>
                  <td>${((Number(weatherData.currentConditions.temp)-32)*5/9).toFixed(1)}</td>
                  <td>${weatherData.currentConditions.humidity}</td>
                  <td>${weatherData.currentConditions.windspeed}</td>
                  <td>${weatherData.currentConditions.sunrise}</td>
                  <td>${weatherData.currentConditions.sunset}</td>
               </tr>
            <table>
         `;
         document.getElementById('weather-info-31').innerHTML = currentWeather;

         let weatherForecast =`
            <p>예상 날씨</p>
            <table>
               <tr><th>날짜 [0시 기준]</th><th>날씨</th><th>구름 %</th><th>최저/최고기온 °C</th><th>습도 %</th><th>바람 m/s</th></tr>
         `;
         weatherData.days.forEach((day, idx) => {
            weatherForecast += `
               <tr>
                  <td><a class="weather-info-32-detail" id="w12d${idx}");">${convertTime3(day.datetimeEpoch)}</a></td>
                  <td>${day.conditions}</td>
                  <td>${day.cloudcover}</td>
                  <td>${((Number(day.tempmin)-32)*5/9).toFixed(1)} / ${((Number(day.tempmax)-32)*5/9).toFixed(1)}</td>
                  <td>${day.humidity}</td>
                  <td>${day.windspeed}</td>
               </tr>
            `;
         });
         weatherForecast += `</table>`;
         document.getElementById('weather-info-32').innerHTML = weatherForecast;
      });
};


export function weatherInfo3Detail(idx) {
   let weatherForecastDetail = `
      <p>상세 날씨 [${convertTime1(globalThis.weatherInfo3Detail[idx].datetimeEpoch).substr(0, 12)}] </p>
      <table>
         <tr><th>시간</th><th>날씨</th><th>구름 [%]</th><th>기온 [°C]</th><th>습도 [%]</th><th>바람 [m/sec]</th></tr>
   `;
   globalThis.weatherInfo3Detail[idx].hours.forEach((hour) => {
      // console.log(hour);
      weatherForecastDetail += `
      <tr>
         <td>${hour.datetime.substr(0, 5)}</td>
         <td>${hour.conditions}</td>
         <td>${hour.cloudcover}</td>
         <td>${((Number(hour.temp)-32)*5/9).toFixed(1)}</td>
         <td>${hour.humidity.toFixed(1)}</td>
         <td>${hour.windspeed}</td>
      </tr>
   `;
   });
   weatherForecastDetail += `</table>`;
   document.getElementById('weather-info-32-detail').innerHTML = weatherForecastDetail;
};


// --------------------------------------------------------------------------------------------


// function weatherInfo3() {
//    const API_CLIENT_ID = 'ats1DR8JHznQgZ4pEEJ5y';
//    const API_CLIENT_SECREAT = 'NpqzzRifHoiT62fv1S8JT0mhQjbg9TU1u3sloGOV';
//    const AERISWEATHER_PAI_URL =  `https://api.aerisapi.com/conditions/${globalThis.clubLat},${globalThis.clubLng}?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECREAT}`;
//    fetch(AERISWEATHER_PAI_URL)
//       .then(response => response.json())
//       .then(response => {
//          // console.log(response);
//          const weatherData = response.response[0].periods[0];
//          const currentWeather = `
//             <h3>> by <a href="https://aerisweather.com">https://aerisweather.com</a></h3>
//             <p>현재 날씨 [${Date(weatherData.timestamp).split(' GMT')[0]} 기준]</p>
//             <table>
//                <tr><th>날씨</th><th>구름 [%]</th><th>온도 [°C]</th><th>습도 [%]</th><th>바람 [m/sec]</th><th>가시거리 [km]</th>
//                <tr>
//                   <td>${weatherData.weather}</td>
//                   <td>${weatherData.sky}</td>
//                   <td>${weatherData.tempC}</td>
//                   <td>${weatherData.humidity}</td>
//                   <td>${(Number(weatherData.windSpeedKPH)*1000/60/60).toFixed(2)}</td>
//                   <td>${weatherData.visibilityKM}</td>
//                </tr>
//             </table>
//          `;
//          document.getElementById('weather-info-31').innerHTML = currentWeather;
//       });
// };