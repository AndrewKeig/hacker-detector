hacker-detector
===============

## Assumptions

The entry passed into the function parseLine has already been added to the log.


## Improvements

The activity log, should be stored in a database, so ideally the log data be copied to a database.

Querying an in-memory list will obviously not scale beyond a single server and performance will not be great.

Querying a log file directly will have similar problems.  

This solution simply querys an in-memory list.

As this list can grow quite large I would look to run a scheduler on this database, which would remove older entries, so the database only holds entries for say the lasy hour; this should resolve any query performance issues.


## Install 

```
npm install
```

## lint, tests and code coverage 

```
grunt coverage
```

## run lint, tests 
```
grunt test
```
## run lint
```
grunt lint
```