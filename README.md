# Node Postgres Task

## Pre requirements

- nodejs >= 8.x
- npm

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

### Subtasks

- Subtask 1

```sql
INSERT INTO bird_colors_info (color, count)
SELECT color, count(name) FROM birds GROUP BY color;
```

- Subtask 2

```sql
INSERT INTO birds_stat (body_length_mean, body_length_median, body_length_mode, wingspan_mean, wingspan_median, wingspan_mode)
SELECT

(SELECT AVG(body_length) AS body_length_mean FROM birds),

(SELECT x.body_length from birds x, birds y GROUP BY x.body_length HAVING SUM(SIGN(1-SIGN(y.body_length-x.body_length))) = (COUNT(*)+1)/2),

ARRAY(SELECT mode() WITHIN GROUP (ORDER BY body_length) AS mode_value FROM birds),

(SELECT AVG(wingspan) AS wingspan_mean FROM birds),

(SELECT x.wingspan from birds x, birds y GROUP BY x.wingspan HAVING SUM(SIGN(1-SIGN(y.wingspan-x.wingspan))) = (COUNT(*)+1)/2),

ARRAY(SELECT mode() WITHIN GROUP (ORDER BY wingspan) AS mode_value FROM birds);
```
