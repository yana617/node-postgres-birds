# Node Postgres Task

## Pre requirements

- nodejs >= 8.x
- npm

npm will be installed with Node:

```bash
brew install node
```

## Quick Start

```bash
git clone https://github.com/yana617/node-postgres-birds.git
cd node-postgres-birds
```

## Running

You need to rename **.env-example** file to **.env** and set your database connection info.

You must have database *birds_db* with table **Birds** (name, species, body_length, wingspan, color).

To start you need to run commands:

```bash
npm install
npm start
```

## Testing

```bash
npm run test
```

### Routes

After successful start!

 GET/POST <http://localhost:8080/birds>

Postgres subtask: [postgres-script.sql](../master/postgres-script.sql)
