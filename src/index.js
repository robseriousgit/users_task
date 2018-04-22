import restify from 'restify';
import route from './route';
import cron from 'node-cron';
import { updateScheduledTasks } from './util/taskManager'

const {
  PORT = '1234'
} = process.env;

const server = restify.createServer();
server.use(restify.plugins.bodyParser({ mapParams: true }));

route(server); 

server.listen(parseInt(PORT, 10), () => {
  console.log(`${server.name} listening at ${server.url}`);
});

// cron set to run every minute
cron.schedule('* * * * *', () => {
  console.log('Running scheduled job');
  updateScheduledTasks();
});

export default server;