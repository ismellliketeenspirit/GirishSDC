  const cassandra = require('cassandra-driver');
  const faker = require('faker');

  const client = new cassandra.Client({
    contactPoints: ['127.0.0.1:9042'],
    keyspace : 'amazon',
    localDataCenter: 'datacenter1'
  });

  client.connect((err) => console.log(err));

  const seed = async () => {



    for (let i = 0; i < 1000; i++) {
      const qry = `insert into link_info (id, linkid, link) values (${i+1}, ${i+1}, '${faker.fake("{{image.imageUrl}}")}')`;
      let data = await client.execute(qry);
      console.log(data);
     }

    // client.execute(qry, (err, res) => {
    //   console.log(res.first());
    // });

  }

  seed()
  .finally(() => {
    client.shutdown(() => console.log('shutdown '));
  }) ;



