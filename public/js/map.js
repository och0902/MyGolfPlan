let mapOptions = {
   center: new naver.maps.LatLng(36.2, 127.3),
   zoom: 8,
};

let map = new naver.maps.Map('map', mapOptions);

let btns = $(".buttons > input");
btns.on("click", function(e) {
   e.preventDefault();

   let mapTypeId = this.id;

   if (map.getMapTypeId() !== naver.maps.MapTypeId[mapTypeId]) {
      map.setMapTypeId(naver.maps.MapTypeId[mapTypeId]); // 지도 유형 변경하기

      btns.removeClass("control-on");
      $(this).addClass("control-on");
   }
});