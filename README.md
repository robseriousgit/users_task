
# Code Sample: User / Task Endpoint

## General

Requres MySQL running, default user (root) password (null) connection


/**
Create local db: blackswan_development 


// node_modules/.bin/sequelize model:generate --name user --attributes username:string,first_name:string,last_name:string
// node_modules/.bin/sequelize model:generate --name task --attributes name:string,description:string,status:string,date_time:date,next_execute_date_time:date



 node_modules/.bin/sequelize db:migrate

*/


TODO:

- add default state for tasks
- add cron job
- clean up old unit tests
- readme


// note: sequelize handles escaping so no need to protect against SQL injection
    
## Setup

Requres MySQL running, default user (root) password (null) connection, or edit in `/config/config.json`

```sh
npm install
node_modules/.bin/sequelize db:migrate
```

## Test

```sh
npm test
```

### Run

```sh
npm start
```

Included is a Postman collection to check all User / Task endpoints