
# Code Sample: User / Task Endpoint

## General

This application allows User and Task management via a Node application to a MySQL database

It was written using Node: v8.6.0 and npm: v5.6.0 use other versions at your peril
    
## Setup

Requres MySQL running on localhost, default user (root) password (null), or edit in `/config/config.json`

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

Sequelize handles escaping so no need to protect against SQL injection
No security, user authentication etc has been written
No logging or monitoring have been setup

