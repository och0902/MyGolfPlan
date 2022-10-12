import { weatherInfo1, weatherInfo2, weatherInfo3 } from './weather-info.js';


export function showZones() {
   const zones = `
      <h3>Play 예정 지역 선택</h3>
      <div>
         <span class="zone" id="z1">경기, 서울, 인천</span>
         <span class="zone" id="z2">강원</span>
         <span class="zone" id="z3">충청, 대전, 세종</span>
         <span class="zone" id="z4">전라, 광주</span>
         <span class="zone" id="z5">경상, 부산, 대구</span>
         <span class="zone" id="z6">제주</span>
      </div>
   `
   document.getElementById('zone-selection').innerHTML = zones;
};


// --------------------------------------------------------------------------------------------


export function showClubNames(selectedZone) {

   fetch('/clubNames', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ "zone": selectedZone })
   })
   .then(response => response.json())
   .then(response => {
      // console.log(response);
      let clubNames = '<h3>Play 예정 클럽 선택</h3><div>';
      response.forEach((clubName) => {
         clubNames += `<span class="club-name">${clubName}</span>`;
      });
      clubNames += `</div>`;
      document.getElementById('club-name-selection').innerHTML = clubNames;
   });
};


// --------------------------------------------------------------------------------------------


export function showPlanInfo(club) {

   document.getElementById('plan-info-container').style.display = 'block';
   // console.log(club);
   let homePageUrl;

   fetch('/clubInfo', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ "club" : club })
   })
   .then(response => response.json())
   .then(response => {
      // console.log(response);

      globalThis.club = response[0].club;
      globalThis.clubLat = response[0].latitude;
      globalThis.clubLng = response[0].longitude;

      homePageUrl = response[0].homePage;
      
      let mapCenter = new naver.maps.LatLng(globalThis.clubLat, globalThis.clubLng);
      map.setCenter(mapCenter);
      map.setZoom(16, true);

      const clubInfos = `
         <h3>Golf Club 정보 : <a href="${response[0].homePage}" target="_blank">${response[0].club}</a></h3>
         <div class="club-info-details">
            <span>위도: ${response[0].latitude}°</span>
            <span>경도: ${response[0].longitude}°</span>
            <span>${response[0].hole} Hole : Par 72</span>
            <span>7,420 yards</span>
            <span>홈페이지 : <a href="${response[0].homePage}" target="_blank">${response[0].homePage}</a></span>
            <span>전화번호 : ${response[0].tel1}</span>
            <span>주소 :  ${response[0].province} ${response[0].address}</span>
            <span>우편번호 : ${response[0].zip}</span>
         </div>
         <div id="current-weather"></div>
      `;
      document.getElementById('club-info').innerHTML = clubInfos;

   }).then(() => {
      
      document.getElementById('weather-info-title').innerHTML = `<h3>날씨 정보 : <a href="${homePageUrl}" target="_blank">${globalThis.club}</a></h3>`;

      weatherInfo1();
      weatherInfo2();
      weatherInfo3();

   });
};
