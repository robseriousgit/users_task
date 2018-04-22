
# Code Sample: User / Task Endpoint

## General

Allows User and Task management via a Restify based Node application linked to a MySQL database

It was written using `Node: v8.6.0` and `npm: v5.6.0` use other versions at your peril
    
## Setup

Requres MySQL running on `localhost`, default user (`root`) with empty password (`null`) and a database named `bs_development`.  Alternatively edit in `/config/config.json`

```
npm install
node_modules/.bin/sequelize db:migrate
```

## Test

```
npm test
```

## Run

```
npm start
```

Hitting `http://localhost:1234/__health` will yeild "OK" if the server is running

Included is a Postman collection to check all User / Task endpoints

## Notes

- Sequelize handles escaping so no need to protect against SQL injection
- No user authentication has been implemented
- No NFRs, logging or monitoring etc have been setup

