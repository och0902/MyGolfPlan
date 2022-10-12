const fs = require('fs');
const NeDB = require('nedb');

const dbGolfCourse = new NeDB({filename: '../golf-club.json' });
dbGolfCourse.loadDatabase( function(err) { 
   if(err) { console.log(err); return; }
      else {
         console.log('Database GolfCourse was set up ...');

         fs.readFile('golf-club.txt', 'utf8', (err, data) => {
            if (err) { 
               console.error(err);
               return;
            };
            // console.log(typeof(data));
            const ccInfo = JSON.parse(data);
            // const ccInfo = data.split(' ,');
            // console.log('ccInfo : ', ccInfo);
            ccInfo.forEach (element => {
               // console.log(element);
               dbGolfCourse.insert(element);
            })
         });
      };
});


