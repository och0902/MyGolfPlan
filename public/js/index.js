import { getTime1 } from './currentTime.js';
import { showZones, showClubNames, showPlanInfo } from './club-info.js';
import { weatherInfo3Detail } from './weather-info.js';


setInterval(() => {
   let time = getTime1();
   document.getElementById('clock').textContent = time;
}, 1000);

document.addEventListener('click', (e) => {
   // console.log(e.target, e.target.className, e.target.id, e.target.innerHTML);
   switch (e.target.className) {
      case 'plan-start' :  
         showZones();
         break;
      case 'zone' :
         showClubNames(e.target.id.substr(1));
         break;
      case 'club-name' :
         showPlanInfo(e.target.innerHTML);
         break;
      case 'weather-info-32-detail' :
         weatherInfo3Detail(e.target.id.substr(4));
         break;
   };
});
