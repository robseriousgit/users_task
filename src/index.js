import restify from 'restify';
//import db from './util/db';
import route from './route';

const {
  PORT = '1234'
} = process.env;

const server = restify.createServer();
server.use(restify.plugins.bodyParser({ mapParams: true }));

route(server); 

server.listen(parseInt(PORT, 10), () => {
  console.log(`${server.name} listening at ${server.url}`);
});

export default server;