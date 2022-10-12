const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const ejs = require('ejs');
const NeDB = require('nedb');

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './public/views');

const dbGolfCourse = new NeDB({filename: './dbs/golf-club.json' });
dbGolfCourse.loadDatabase( function(err) { 
   if(err) console.log(err)
      else console.log('Database golf-course was set up ...');
});

app.get('/', (request, response) => {
   response.render('main.ejs');
});

app.post('/clubNames', (request, response) => {
   // console.log('zone', request.body.zone, 'selected ...');
   dbGolfCourse.find({ "zone": Number(request.body.zone) }, (err, clubInfos) => {
      if(err !== null) {
         console.log(err);
         return;
      };
      let clubNames = [];
      clubInfos.forEach( (clubInfo) => {
         clubNames.push(clubInfo.club);
      });
      clubNames.sort();
      return response.json(clubNames);
   });
});

app.post('/clubInfo', (request, response) => {
   // console.log(request.body.club, 'seleted ...');
   dbGolfCourse.find({ "club": request.body.club }, (err, clubInfo) => {
      if(err !== null) {
         console.log(err);
         return;
      };
      // console.log('clubInfo : ',clubInfo);
      return response.json(clubInfo);
   });
});

app.listen(process.env.PORT, (request, response)=> {
   console.log(`Server is running on port http://localhost:${process.env.PORT} ...`);
})