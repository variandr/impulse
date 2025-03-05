## Description

This is NestJS monorepo test project. Main stack: TypeScript, NestJS, RxJs, PostgreSQL, TypeORM, Docker

**IMPORTANT**

For basic route protection we are using `x-access-token` header for each request, so please keep in mind that you will
need it if you want to use this api

Basic route should start with: http://localhost:3000/api/v1/

P.S. You will find `x-access-token` in the `.env` file

## Project setup

```bash
$ docker compose up -d

# apply migrations to the DB
$ npm run migration:run
```

## Start without docker

```bash
$ npm install

# run api service
$ npm run start:dev api

# run worker service
$ npm run start:dev worker
```

## Work with migrations

```bash
# create new migration
$ npm run migration:create

# generate migration from entities
$ npm run migration:create

# apply created migrations
$ npm run migration:run
```

## Structure
```
/root
│── /apps
│   ├── /api               # Main API application
│   ├── /worker            # Background worker service (jobs, etc)
│── /libs
│   ├── /common            # Shared guards, interceptors, middlewares, utilities and DTOs
│   ├── /database          # TypeORM entities, migrations, database configuration and repositories
│   ├── /impulse           # Business logic related to impulse service
```