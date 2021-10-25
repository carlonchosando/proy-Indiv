//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Type } = require('./src/db.js');
const axios = require('axios');
// Syncing all the models at once.
conn.sync({ force: false }).then(async() => { /// la pre carga con los tipos la realizo aqui dentro para cuando ionicio server
  let dataType = await axios.get('https://pokeapi.co/api/v2/type/');
  dataType = dataType.data.results.map(type => ({name: type.name}));
  
  let sendDbType = dataType.map(type => 
    Type.findOrCreate({where: {name: type.name}})// return promises sequelize . 
    )
    /* console.log(dataType); */
    Promise.all(sendDbType).then(() => console.log('upload all Type'));
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
