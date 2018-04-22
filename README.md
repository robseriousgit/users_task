
# Code Sample: User / Task Endpoint

## General

This application allows User and Task management via a Node application to a MySQL database
    
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

## Run

```sh
npm start
```

Included is a Postman collection to check all User / Task endpoints

## Notes

// note: sequelize handles escaping so no need to protect against SQL injection
// No security
// logging etc
