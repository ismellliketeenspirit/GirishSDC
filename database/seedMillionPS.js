const dbConnection = require('./dbPostgres.js');
const format = require('pg-format');

const startTime = new Date().getTime();
const seed = async () => {

  const count = 10000000;
  let recCount = 1;
  let tuple = [];
  for (i = 1; i <= count; i++ ) {
    let linkArr = [];
    for(k = 0; k < 5; k++) {
      let linkId = Math.floor(Math.random() * 1000);

      while (linkArr.indexOf(linkId) !== -1){
        linkId = Math.floor(Math.random() * 1000);
      }
      linkArr.push(linkId);
      tuple.push([i, linkId]);
    }
    // console.log('Tuple ', tuple);
      // await dbConnection.runQuery(`Insert into photoProduct (id, linkId) values(${i}, ${linkId})`);
      if (i % (count/1000) === 0) {
        let query1 = format(`Insert into photoProduct (id, linkId) values %L returning id`, tuple);
        let data = await dbConnection.client.query(query1);
        console.log(data);
        tuple.splice(0, tuple.length);
      }

      console.log('Records written :',  recCount++);

    // }
    linkArr = [];
  }
  console.log('Complete of seeding ', recCount, ' records.');
}

seed().then(() => {
  console.log('Complete');
})
.finally(() => {
  let endTime = new Date().getTime();

  console.log('Time Elapsed : ', Math.round((endTime - startTime)/1000 , 2), ' seconds.' );

  dbConnection.client.end();
});
